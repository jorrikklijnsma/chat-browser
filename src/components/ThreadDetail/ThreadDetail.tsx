// ./src/components/ThreadDetail/ThreadDetail.tsx

import React from 'react';
import styled from 'styled-components';
import { Message } from '../../types';
import ThreadMessage from './ThreadMessage';

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

// Assume that the Message component is already styled
// and can be reused here to display each message in the thread.

interface Props {
  threadId: string;
  threadMessages: Message[];
}

const ThreadDetail: React.FC<Props> = ({ threadId, threadMessages }) => {
  return (
    <ThreadPanel>
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
