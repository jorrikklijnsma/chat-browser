import React from 'react';
import { Message, MessageBlock, MessageElement } from '../../types/Message';
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

const ThreadDisplay = ({ threadId }) => {
  return <div>Thread: {threadId}</div>;
};

const MessageList: React.FC<
  Props & { onSelectThread: (threadId: string) => void }
> = ({ messages, users, onSelectThread }) => {
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
      const hours = date.getHours();
      const minutes = '0' + date.getMinutes();
      const seconds = '0' + date.getSeconds();
      const formattedTime =
        hours + ':' + minutes.slice(-2) + ':' + seconds.slice(-2);

      return {
        user: getUserNiceName(message.user, users),
        content: contentBlocks ? contentBlocks : message.text || null,
        isThread: message.thread_ts ? true : false,
        replyCount: message.reply_count,
        date: date.toLocaleDateString('en-US'),
        time: formattedTime,
        threadId: message.threadId,
      };
    })
    .filter((message) => message.content !== null)
    .filter((message) => !message.isThread);

  return (
    // <MessageChannel>
    //   {formattedMessages.map((message, index) => (
    //     <MessageBlock key={index}>
    //       <div>
    //         <strong>{message.user}</strong>: {message.content}
    //       </div>
    //       <div>
    //         {message.replyCount && <p>replies: {message.replyCount}</p>}
    //         <p>Date: {message.date ? message.date : 'no known date'}</p>
    //         <p>Time: {message.time ? message.time : 'no known time'}</p>
    //       </div>
    //     </MessageBlock>
    //   ))}
    // </MessageChannel>
    <MessageChannel>
      {formattedMessages.map((message, index) => (
        <MessageBlock key={index}>
          <div>
            <strong>{message.user}</strong>: {message.content}
          </div>
          {message.replyCount && <p>replies: {message.replyCount}</p>}
          <p>Date: {message.date ? message.date : 'no known date'}</p>
          <p>Time: {message.time ? message.time : 'no known time'}</p>
          {message.isThread && (
            <button onClick={() => onSelectThread(message.threadId)}>
              Open Thread
            </button>
          )}
        </MessageBlock>
      ))}
    </MessageChannel>
  );
};

export default MessageList;
