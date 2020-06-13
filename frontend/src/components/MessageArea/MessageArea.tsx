import React from 'react';

import { MessagesBox } from '../MessagesBox/MessagesBox';
import { MessageInput } from '../MessageInput/MessageInput';
import { UserDisplay } from '../UserDisplay/UserDisplay';

import styles from './MessageArea.module.css';

export const MessageArea: React.FC<{}> = (props) => {
  return (
    <div className={styles.Container}>
      <div className={styles.Top}>
        <UserDisplay name="User" />
        <MessagesBox />
      </div>
      <div className={styles.Bottom}>
        <MessageInput onSubmit={(val) => console.log(val)} />
      </div>
    </div>
  );
};
