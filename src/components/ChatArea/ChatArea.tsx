// ./src/components/ChatArea/ChatArea.tsx

import React, { useCallback } from 'react';
import styled from 'styled-components';
import ChatMessage from '../Message/ChatMessage';
import groupMessagesByDate from '../../utils/GroupMessagesByDate';
import { Message } from '../../types';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: calc(
    100vh - 48px
  ); // Adjust height to account for header/footer if present
  overflow-y: auto;
`;

const DaySeparator = styled.div`
  text-align: center;
  margin: 20px 0;
  // Additional styling
`;

const DateSeparatorText = styled.span`
  background-color: #f8f8f8; // Use Slack's background color
  color: #999;
  padding: 5px 10px;
  border-radius: 10px;
  // Additional styling
`;

// ChatArea component accepts an array of messages and groups them by date
interface ChatAreaProps {
  messages: Message[];
  onSelectThread: (thread_ts: string) => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({ messages, onSelectThread }) => {
  const filteredMessages = messages.filter(
    (message) => !message.thread_ts || message.thread_ts === message.id,
  );

  const groupedMessages = groupMessagesByDate(filteredMessages); // Use your existing grouping function

  // Keep a map of message refs
  const messageRefs = new Map<string, React.RefObject<string>>();

  const handleSelectThread = useCallback((thread_ts: string | undefined) => {
    if (thread_ts === undefined) {
      return;
    }
    onSelectThread(thread_ts);
  }, []);

  // Logic to render messages and pass refs
  const renderMessages = (messagesToRender: Message[]) => {
    return messagesToRender.map((message) => {
      // Create a ref for each message if it doesn't exist
      if (!messageRefs.has(message.id)) {
        messageRefs.set(message.id, React.createRef());
      }

      return (
        <ChatMessage
          key={message.id}
          ref={messageRefs.get(message.id)}
          message={message}
          onSelectThread={handleSelectThread}
        />
      );
    });
  };

  return (
    <ChatContainer>
      {Object.entries<Message[]>(groupedMessages).map(([date, messages]) => (
        <React.Fragment key={date}>
          <DaySeparator>
            <DateSeparatorText>{date}</DateSeparatorText>
          </DaySeparator>
          {renderMessages(messages)}
        </React.Fragment>
      ))}
    </ChatContainer>
  );
};

export default ChatArea;
