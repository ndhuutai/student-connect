import { ConnectionAction } from '../actionTypes/socket';

export interface IConnection {
  socket: SocketIOClient.Socket | null;
  userName: string;
  userId: string;
}

export const defaultState: IConnection = {
  socket: null,
  userName: '',
  userId: '',
};

export default (
  state = defaultState,
  actions: ConnectionAction
): IConnection => {
  switch (actions.type) {
    case 'setSocket':
      return {
        ...state,
        socket: actions.socket,
      };
    case 'setUserName':
      return {
        ...state,
        userName: actions.userName,
      };
    case 'setUserId':
      return {
        ...state,
        userId: actions.userId,
      };
    default:
      return state;
  }
};
