import React from 'react';

import { MessagesBox } from '../MessagesBox/MessagesBox';
import { MessageInput } from '../MessageInput/MessageInput';
import { UserDisplay } from '../UserDisplay/UserDisplay';

export const MessageArea: React.FC<{}> = (props) => {
  return (
    <div>
      <UserDisplay name="User" />
      <MessagesBox />
      <MessageInput onSubmit={(val) => console.log(val)} />
    </div>
  );
};
