import React from 'react';
import {
  Message,
  MessageBlock,
  MessageElement,
  TextElement,
} from '../../types/Message'; // Adjust the path as necessary
import { User } from '../../types';
import { getUserNiceName } from '../../utils/GetUserNiceName';
import { styled } from 'styled-components';

interface Props {
  messages: Message[];
  users: User[];
}

const MessageChannel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
`;

const MessageBlock = styled.div`
  display: flex;
  flex-direction: column;
  background: hsla(0, 100%, 100%, 0.2);
  padding: 1rem;
`;

const MessageList: React.FC<Props> = ({ messages, users }) => {
  console.log('Hello from MessageList.tsx');
  console.log(messages);

  // Function to render message blocks if necessary
  // const renderMessageBlocks = (blocks: MessageBlock[]) => {
  //   return blocks.map((block, index) => (
  //     <div key={index}>
  //       {block.elements.map((element: MessageElement, idx: number) => {
  //         <p key={idx}>
  //           {element.type === 'rich_text_section' ? (
  //             block.elements.map(
  //               (messageElement: TextElement, messageIndex: number) => {
  //                 return <span key={messageIndex}>{messageElement.text}</span>;
  //               },
  //             )
  //           ) : (
  //             <>no text message</>
  //           )}
  //         </p>;
  //       })}
  //     </div>
  //   ));
  // };

  const renderMessageBlocks = (blocks: MessageBlock[]) => {
    return blocks.map((block, index) => (
      <div key={index}>
        {block.type === 'rich_text' &&
          block.elements.map((messageElement: MessageElement, idx: number) => {
            return (
              <p key={idx}>
                {messageElement.type === 'rich_text_section' ? (
                  messageElement.elements.map(
                    (textElement: any, textElementIndex: number) => {
                      return (
                        <span key={textElementIndex}>{textElement.text}</span>
                      );
                    },
                  )
                ) : (
                  <>no text message</>
                )}
              </p>
            );
          })}
      </div>
    ));
  };

  const formattedMessages = messages
    .map((message: Message) => {
      const contentBlocks = message?.blocks
        ? renderMessageBlocks(message.blocks)
        : null;

      const date = new Date(parseInt(message.ts) * 1000);

      // Hours part from the timestamp
      const hours = date.getHours();

      // Minutes part from the timestamp
      const minutes = '0' + date.getMinutes();

      // Seconds part from the timestamp
      const seconds = '0' + date.getSeconds();

      // Will display time in 10:30:23 format
      const formattedTime =
        hours + ':' + minutes.slice(-2) + ':' + seconds.slice(-2);

      return {
        user: getUserNiceName(message.user, users),
        content: contentBlocks ? contentBlocks : message.text || null,
        isThread: message.thread_ts ? true : false,
        replyCount: message.reply_count,
        date: date.toLocaleDateString('en-US'),
        time: formattedTime,
      };
    })
    .filter((message) => message.content !== null)
    .filter((message) => !message.isThread);

  return (
    <MessageChannel>
      {formattedMessages.map((message, index) => (
        <MessageBlock key={index}>
          <div>
            <strong>{message.user}</strong>: {message.content}
          </div>
          <div>
            <p>replies: {message.replyCount}</p>
            <p>Date: {message.date}</p>
            <p>Time: {message.time}</p>
          </div>
        </MessageBlock>
      ))}
    </MessageChannel>
  );
};

export default MessageList;
