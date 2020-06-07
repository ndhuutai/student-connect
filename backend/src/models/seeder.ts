// import { Seeder } from "mongo-seeding";
import { Room as RoomModel } from './Room';
import { User as UserModel } from './User';
// const config = {
//   database: {
//     host: '127.0.0.1',
//     port: 27017,
//     name: 'student-connect'
//   },
//   dropDatabase: true
// }

// const seeder = new Seeder(config);

export const createRooms = (): void => {
  RoomModel.create({
    users: [],
    messageHistory: [],
    alias: 'Human Resources',
  });
  RoomModel.create({
    users: [],
    messageHistory: [],
    alias: 'Cashier',
  });
  RoomModel.create({
    users: [],
    messageHistory: [],
    alias: 'Registration & Records',
  });

  RoomModel.create({
    users: [],
    messageHistory: [],
    alias: 'Tutor',
  });
};

export const createUsers = (): void => {
  UserModel.create({
    alias: 'Tai',
    username: 'tai',
    password: 'tai',
  });

  UserModel.create({
    alias: 'other Tai',
    username: 'other',
    password: 'other',
  });
};
