// ./src/components/ChatArea/ChatArea.tsx

import React from 'react';
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
}

const ChatArea: React.FC<ChatAreaProps> = ({ messages }) => {
  const filteredMessages = messages.filter(
    (message) => !message.threadId || message.threadId === message.id,
  );

  const groupedMessages = groupMessagesByDate(filteredMessages); // Use your existing grouping function

  return (
    <ChatContainer>
      {Object.entries(groupedMessages).map(([date, messages]) => (
        <React.Fragment key={date}>
          <DaySeparator>
            <DateSeparatorText>{date}</DateSeparatorText>
          </DaySeparator>
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </React.Fragment>
      ))}
    </ChatContainer>
  );
};

export default ChatArea;
