import React, { useState, useContext, memo } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { MessageItem } from '../MessageItem/MessageItem';
import { ConversationStateContext } from '../../contexts/conversation';
//create a message item for each message
//depends on who sent it, we can have it flushed to either left or right

interface Message {
  userId: string;
  text: string;
  userName: string;
}

export const MessagesBox: React.FC<{}> = memo((props) => {
  //change it to a message type
  // const [messages, setMessages] = useState<Message[]>([
  //   { userId: 1, text: 'First message' },
  //   { userId: 2, text: 'Second message' },
  //   { userId: 1, text: 'Third message' },
  // ]);

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: '100%',
      },
    })
  );

  const conversation = useContext(ConversationStateContext);

  console.log('conversation currently', conversation.conversation);

  //load the state with messages
  //if no messages, display something maybe
  //else iterate through the messages and create messageItems to render
  return (
    <div className={useStyles().root}>
      {conversation.conversation.map((message) => {
        return (
          <MessageItem
            key={message.text}
            text={message.text}
            id={message.userId}
            userName={message.userName}
          />
        );
      })}
    </div>
  );
});
