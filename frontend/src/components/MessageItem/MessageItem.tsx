import React, { memo } from 'react';
import classes from './MessageItem.module.css';
import { Avatar } from '@material-ui/core';

interface IMessageItem {
  text: string;
  id: string; //the id of the user, might change when we figure out what type of user identification is churned out from an auth library.
  userName: string;
}

export const MessageItem: React.FC<IMessageItem> = memo((props) => {
  const styles: string[] = [classes.MessageItem__Container];
  props.id !== '1'
    ? styles.push(classes['MessageItem__Left'])
    : styles.push(classes['MessageItem__Right']);
  console.log('props.username', props.userName);
  return (
    <div className={styles.join(' ')}>
      {props.id !== '1' ? (
        <Avatar className={classes.MessageItem__Avatar}>
          {props.userName}
        </Avatar>
      ) : (
        ''
      )}
      <p className={classes.MessageItem__Content}>{props.text}</p>
    </div>
  );
});
