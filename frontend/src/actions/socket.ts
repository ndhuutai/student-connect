import { ConnectionAction } from '../actionTypes/socket';
import { Dispatch } from 'react';
import { Actions as convoActions } from '../actionTypes/conversation';
import { addMessage } from '../actions/conversation';
import { IConnection } from '../reducers/socket';
import { DispatchConversationContext } from '../contexts/conversation';

export const setSocket = (
  socket: SocketIOClient.Socket,
  convoDispatch: Dispatch<convoActions>
): ConnectionAction => ({
  type: 'setSocket',
  socket: setEventHanlders(socket, convoDispatch),
});

export const setUserName = (userName: string): ConnectionAction => {
  console.log('user in setUser', userName);
  return {
    type: 'setUserName',
    userName,
  };
};

export const setUserId = (userId: string): ConnectionAction => {
  return {
    type: 'setUserId',
    userId,
  };
};

export const joinRoom = (
  socket: SocketIOClient.Socket,
  roomData: string,
  userId: string
): void => {
  socket.emit('join', roomData, userId);
};

// LISTENERS

const setEventHanlders = (
  socket: SocketIOClient.Socket,
  dispatch: Dispatch<convoActions>
) => {
  const eventListeners = composeListeners(
    onAnnouncement,
    onMessageFromRoom,
    onNewUserJoined
  );

  eventListeners({ socket, dispatch });

  return socket;
};

const composeListeners = (...functions: Function[]): Function => {
  return (arg: {
    socket: SocketIOClient.Socket;
    dispatch: Dispatch<convoActions>;
  }) => {
    functions.reduce((composed, f) => {
      f(composed);
      return composed;
    }, arg);
  };
};

const onAnnouncement = ({
  socket,
  dispatch,
}: {
  socket: SocketIOClient.Socket;
  dispatch: Dispatch<convoActions>;
}) => {
  socket.on('announcement', (message: string) => {
    console.log(message);
    dispatch(
      addMessage({
        userId: 'server',
        text: message,
        userName: 'S',
      })
    );
  });
};

const onMessageFromRoom = ({
  socket,
  dispatch,
}: {
  socket: SocketIOClient.Socket;
  dispatch: Dispatch<convoActions>;
}) => {
  socket.on(
    'messageFromRoom',
    (userId: string, message: string, user: string) => {
      console.log('user in here', user);
      //FIXME: fix user if changed to an object
      dispatch(
        addMessage({
          userId,
          text: message,
          userName: user,
        })
      );
    }
  );
};

const onNewUserJoined = ({
  socket,
  dispatch,
}: {
  socket: SocketIOClient.Socket;
  dispatch: Dispatch<convoActions>;
}) => {
  socket.on('newUserJoined', (message: string) => {
    console.log(message);
    dispatch(
      addMessage({
        userId: 'server',
        text: message,
        userName: 'S',
      })
    );
  });
};
