import React, { useState, useContext } from 'react';
import { addMessage } from '../../actions/conversation';
import {
  TextField,
  Button,
  Icon,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import {
  DispatchConversationContext,
  ConversationStateContext,
} from '../../contexts/conversation';
import { connection as connectionContext } from '../../contexts/socket';

import classes from './MessageInput.module.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(0, 0, 0, 1),
    },
  })
);

interface IMessageInput {
  onSubmit: (submittedValue: string) => any;
}

export const MessageInput: React.FC<IMessageInput> = (props) => {
  const buttonStyles = useStyles();

  const conversationDispatch = useContext(DispatchConversationContext);
  const conversationState = useContext(ConversationStateContext);
  const connection = useContext(connectionContext);

  const [message, setMessage] = useState<string>('');

  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setMessage(e.target.value);
  };

  const onSubmitHandler: React.FormEventHandler = (e) => {
    e.preventDefault();
    const trimmedMsg = message.trim();

    connection?.socket?.emit(
      'messageToRoom',
      conversationState.room,
      trimmedMsg,
      connection.userId, //TODO: Decide whether to send the user along with the message or let the server find the user and send it for us
      () => {
        conversationDispatch(
          addMessage({
            userId: '1',
            text: trimmedMsg,
            userName: connection.userName,
          })
        );
        setMessage('');
      }
    );
  };

  //TODO: Fix the style of this enclosing div
  return (
    <>
      <form onSubmit={onSubmitHandler} className={classes.Form}>
        <TextField
          onChange={onChangeHandler}
          value={message}
          className={classes.InputBox}
        />
        <Button
          variant="contained"
          color="primary"
          className={buttonStyles.button}
          endIcon={<Icon>send</Icon>}
          type={'submit'}
        >
          Send
        </Button>
      </form>
    </>
  );
};
