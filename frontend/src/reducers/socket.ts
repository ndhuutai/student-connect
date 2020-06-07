import { ConnectionAction } from '../actionTypes/socket';

export interface IConnection {
  socket: SocketIOClient.Socket | null;
  userName: string;
}

export const defaultState: IConnection = {
  socket: null,
  userName: '',
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
      console.log('user name in actions here', actions.userName);
      return {
        ...state,
        userName: actions.userName,
      };
    default:
      return state;
  }
};
