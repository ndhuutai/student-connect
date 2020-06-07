export interface IMessage {
  userId: string;
  text: string;
  userName: string;
}

export interface IAddMessage {
  type: 'add';
  payload: IMessage;
}

export interface ISendMessage {
  type: 'send';
}

export interface ISendMessageSuccess {
  type: 'sent';
}

export interface ISendMessageFailure {
  type: 'failed';
}

export interface ILastSender {
  type: 'setLastSender';
  userId: string;
}

export interface ISetRoom {
  type: 'setRoom';
  room: string;
}

export type Actions =
  | IAddMessage
  | ILastSender
  | ISendMessage
  | ISendMessageSuccess
  | ISendMessageFailure
  | ISetRoom;
