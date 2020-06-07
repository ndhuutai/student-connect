import { createContext, Dispatch } from 'react';
import { Actions } from '../actionTypes/conversation';
import { defaultState, IConversation } from '../reducers/conversation';

export const ConversationStateContext = createContext<IConversation>(
  defaultState
);
export const DispatchConversationContext = createContext<
  Dispatch<Actions | void>
>(() => {});
