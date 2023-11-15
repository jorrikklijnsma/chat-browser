// ./src/components/Sidebar/Sidebar.tsx

import React from 'react';
import styled from 'styled-components';
import { Channel } from '../../types'; // Import the Channel type

const SidebarWrapper = styled.div`
  grid-area: sidebar;
  background-color: #3f0e40; // Slack's sidebar background color
  color: white;
  height: 100vh;
  overflow-y: auto;
`;

const SidebarHeader = styled.div`
  padding: 20px;
  // Additional styling
`;

const ChannelList = styled.ul`
  list-style: none;
  padding: 0;
  // Additional styling
`;

const ChannelListItem = styled.li`
  padding: 10px 20px;
  &:hover {
    background-color: #350d36; // Hover state background
    cursor: pointer;
  }
`;

// Add styled components for sections like direct messages, apps, etc.

interface SidebarProps {
  channels: Channel[];
  onSelectChannel: (channelId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ channels, onSelectChannel }) => {
  return (
    <SidebarWrapper>
      <SidebarHeader>
        {/* You can add user status or workspace name here */}
      </SidebarHeader>
      <ChannelList>
        {channels.map((channel) => (
          <ChannelListItem
            key={channel.id}
            onClick={() => onSelectChannel(channel.name)}
          >
            # {channel.name}
          </ChannelListItem>
        ))}
      </ChannelList>
      {/* Add other sidebar sections here */}
    </SidebarWrapper>
  );
};

export default Sidebar;
