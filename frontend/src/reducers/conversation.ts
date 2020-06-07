import { IMessage, Actions } from '../actionTypes/conversation';

export interface IConversation {
  conversation: IMessage[];
  lastSender: string | null | undefined;
  isSending: boolean;
  isSent: boolean;
  failToSend: boolean;
  room: string;
}

export const defaultState: IConversation = {
  conversation: [],
  room: '',
  lastSender: '',
  isSending: false,
  isSent: false,
  failToSend: false,
};

export default (state = defaultState, actions: Actions): IConversation => {
  switch (actions.type) {
    case 'add':
      return {
        ...state,
        lastSender: actions.payload.userId,
        conversation: [...state.conversation, actions.payload],
      };
    case 'send':
      return {
        ...state,
        isSending: true,
        isSent: false,
        failToSend: false,
      };

    case 'sent':
      return {
        ...state,
        isSending: false,
        isSent: true,
        failToSend: false,
      };
    case 'failed':
      return {
        ...state,
        isSent: false,
        isSending: false,
        failToSend: true,
      };

    case 'setRoom':
      return {
        ...state,
        room: actions.room,
      };
    default:
      return state;
  }
};
