import { Dispatch } from 'react';
import { Actions as convoActions } from '../actionTypes/conversation';

export interface ISetSocket {
  type: 'setSocket';
  socket: SocketIOClient.Socket;
}

export interface ISetUserName {
  type: 'setUserName';
  userName: string;
}

export interface IJoinRoom {
  type: 'joinRoom';
  room: string;
  userId: string;
  socket: SocketIOClient.Socket;
}

export type ConnectionAction = ISetSocket | IJoinRoom | ISetUserName;
