import { createContext, Dispatch } from 'react';
import { ConnectionAction } from '../actionTypes/socket';

export const connection = createContext<{
  dispatch: Dispatch<ConnectionAction>;
  socket: SocketIOClient.Socket | null;
  userName: string;
  userId: string;
} | null>(null);
