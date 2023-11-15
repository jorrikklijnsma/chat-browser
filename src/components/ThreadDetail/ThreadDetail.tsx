// ./src/components/ThreadDetail/ThreadDetail.tsx

import React from 'react';
import styled from 'styled-components';
import { Message } from '../../types';
import ThreadMessage from '../Message/ChatMessage';

const ThreadPanel = styled.div`
  grid-area: thread;
  border-left: 1px solid #ccc; // You can adjust the color to match Slack's UI
  width: 350px; // Slack's thread panel width, you can adjust as necessary
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const ThreadHeader = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ccc; // Again, adjust the color as necessary
  // Other styling as per Slack's UI
`;

const ThreadMessageList = styled.div`
  padding: 10px;
  overflow-y: auto;
  // Additional styling
`;

const CloseThreadButton = styled.button`
  // Style your button to match Slack's close button
`;

interface Props {
  threadId: string;
  threadMessages: Message[];
  onCloseThread: () => void; // Add a close handler prop
}

const ThreadDetail: React.FC<Props> = ({
  threadId,
  threadMessages,
  onCloseThread,
}) => {
  return (
    <ThreadPanel>
      <CloseThreadButton onClick={onCloseThread}>X</CloseThreadButton>
      <ThreadHeader>
        {/* You can add the thread topic here */}
        Thread: {threadId}
      </ThreadHeader>

      <ThreadMessageList>
        {threadMessages.map((message, index) => (
          <ThreadMessage key={index} message={message} />
        ))}
      </ThreadMessageList>
    </ThreadPanel>
  );
};

export default ThreadDetail;
