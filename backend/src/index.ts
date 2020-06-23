import path from 'path';

import http from 'http';
import express, { NextFunction } from 'express';
import session from 'express-session';
import passport from 'passport';
import passportLocal from 'passport-local';
import { Request, Response } from 'express';
import SocketIO, { Socket, Client, Server } from 'socket.io';
import mongoose from 'mongoose';
import { Room } from './models/Room';
import { createRooms, createUsers } from './models/seeder';
import { User } from './models/User';
import { runInNewContext } from 'vm';
import { doesNotMatch } from 'assert';

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const LocalStrategy = passportLocal.Strategy;

mongoose.connect(
  'mongodb://localhost/student-connect',
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    Room.deleteMany({})
      .exec()
      .then((res) => {
        console.log(res);
        console.log('wiped data');
        createRooms();
      })
      .catch((e) => {
        console.log(e, 'no wth');
      });
    User.deleteMany({})
      .exec()
      .then((res) => {
        console.log(res);
        console.log('wiped data');
        createUsers();
      })
      .catch((e) => {
        console.log(e, 'no wth');
      });
  }
);

const io = SocketIO(
  server.listen(port, () => {
    console.log('server is running');
  })
);

const sessionMiddleware = session({
  secret: 'realSecretT0ken',
  resave: false,
  saveUninitialized: false,
});

app.use(sessionMiddleware);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '../../frontend/dist/')));

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username, password })
      .exec()
      .then((result) => {
        if (!result) {
          console.log('wrong credentials');
          return done(null, false, { message: 'Incorrect username.' });
        }

        return done(null, result);
      })
      .catch((e) => {
        return done(e);
      });
  })
);

app.get('/rooms', (req: Request, res: Response) => {
  Room.find({})
    .exec()
    .then((rooms) => {
      if (rooms) {
        res.send(rooms);
      } else {
        res.status(500).send({ err: 'There was an error' });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post('/login', passport.authenticate('local'), (req, res) => {
  const isAuthenticated = !!req.user;

  console.log(isAuthenticated, req.user);
  if (isAuthenticated) {
    return res.send(req.user);
  } else {
    return res.status(400).send({ error: 'Wrong credentials' });
  }
});

app.post('/logout', (req, res) => {
  const socketId = req.session?.socketId;
  if (socketId && io.of('/').connected[socketId]) {
    console.log('forcefully closing the socket', socketId);
    io.sockets.connected[socketId].disconnect(true);
  }

  req.logout();
  res.cookie('connect.sid', '', { expires: new Date() });
  res.redirect('');
});

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

app.use((err, req, res) => {
  console.log(err);
});

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

//SOCKET IO

const wrap = (middleware: any) => (
  socket: SocketIO.Socket,
  next: NextFunction
) => middleware(socket.request, {}, next);

io.use(wrap(sessionMiddleware));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));

io.use((socket: SocketIO.Socket, next: NextFunction) => {
  if (socket.request.user) {
    next();
  } else {
    next(new Error('unauthorized'));
  }
});

io.on('connection', (client: Socket) => {
  console.log('a client connected with id', client.id);

  client.on(
    'messageToRoom',
    (roomName: string, message: string, user: string, confirmCB: Function) => {
      client.to(roomName).emit('messageFromRoom', client.id, message, user);
      //save the message to the database before calling the call back
      Room.findById(roomName)
        .exec()
        .then((room) => {
          if (room) {
            const currentMessageHistory = room.toObject().messageHistory;
            currentMessageHistory.push({
              text: message,
              user: user,
            });
            room
              .update({
                messageHistory: currentMessageHistory,
              })
              .exec()
              .then((result) => {
                console.log('update result', result);
              })
              .catch((e) => {
                console.log(e);
              });
          }
        })
        .catch((e) => {
          console.log('error saving data');
        });
      confirmCB();
    }
  );

  client.on('join', (roomData: string, userId: string) => {
    client.join(roomData, () => {
      //emit other clients
      io.to(roomData).emit(
        'announcement',
        `Welcome  ,${client.id}. Please wait for a staff to connect with you.`
      );

      Room.findOne({ alias: roomData })
        .exec()
        .then((room) => {
          console.log(room);
        })
        .catch((e) => {
          console.log(e);
        });

      client.to(roomData).emit('newUserJoined', `${client.id} has connected!!`);
    });
  });

  client.on('disconnect', () => {
    console.log('client disconnected');
  });
});
