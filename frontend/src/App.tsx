import React, { useReducer, useEffect, useState } from 'react';
import { CssBaseline } from '@material-ui/core';
import { Layout } from './components/Layout/Layout';
import {
  ConversationStateContext,
  DispatchConversationContext,
} from './contexts/conversation';
import conversationReducer, {
  defaultState as conversationDefault,
} from './reducers/conversation';
import { connection as ConnectionContext } from './contexts/socket';
import { setSocket } from './actions/socket';
import connectionReducer, {
  defaultState as connectionDefault,
} from './reducers/socket';

import io from 'socket.io-client';
import { SelectDepartment } from './components/SelectDepartment/SelectDepartment';
import { Login } from './components/Login/Login';
import { MessageArea } from './components/MessageArea/MessageArea';

export const App: React.FC<{}> = () => {
  const [isLoggedin, SetIsLoggedIn] = useState(false);
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false);

  const [conversation, convoDispatch] = useReducer(
    conversationReducer,
    conversationDefault
  );

  const [connection, connectionDispatch] = useReducer(
    connectionReducer,
    connectionDefault
  );

  //start and save the connection to the store for access later.
  useEffect((): void => {
    const newIO: SocketIOClient.Socket = io();
    connectionDispatch(setSocket(newIO, convoDispatch));
    console.log('yo wth is going on');
  }, []);

  return (
    <>
      <CssBaseline />
      <Layout>
        <ConversationStateContext.Provider value={conversation}>
          <DispatchConversationContext.Provider value={convoDispatch}>
            <ConnectionContext.Provider
              value={{
                dispatch: connectionDispatch,
                socket: connection.socket,
                userName: connection.userName, //TODO: Revisit this to remember that the issue was because the reducer did update but the state of 'username' is hardcoded
              }}
            >
              {isLoggedin ? (
                <>
                  {hasJoinedRoom ? (
                    <MessageArea />
                  ) : (
                    <SelectDepartment onJoin={() => setHasJoinedRoom(true)} />
                  )}
                </>
              ) : (
                <Login onLogInSucess={() => SetIsLoggedIn(true)} />
              )}
            </ConnectionContext.Provider>
          </DispatchConversationContext.Provider>
        </ConversationStateContext.Provider>
      </Layout>
    </>
  );
};
