import { IAddMessage, IMessage, ISetRoom } from '../actionTypes/conversation';

export const addMessage = (message: IMessage): IAddMessage => ({
  type: 'add',
  payload: message,
});

export const setRoom = (room: string): ISetRoom => ({
  type: 'setRoom',
  room,
});
