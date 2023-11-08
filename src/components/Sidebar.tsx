// src/components/Sidebar.tsx

import React from 'react';
import styled from 'styled-components';
import { Channel } from '../types';

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  overflow-y: auto;
  background-color: #3f0e40;
  color: white;
  padding: 10px;
`;

const ChannelList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ChannelListItem = styled.li`
  padding: 10px 15px;
  &:hover {
    background-color: #350d36;
    cursor: pointer;
  }
`;

interface Props {
  channels: Channel[];
  onSelectChannel: (channelId: string) => void;
}

const Sidebar: React.FC<Props> = ({ channels, onSelectChannel }) => {
  return (
    <SidebarContainer>
      <ChannelList>
        {channels.map((channel) => (
          <ChannelListItem
            key={channel.id}
            onClick={() => onSelectChannel(channel.id)}
          >
            # {channel.name}
          </ChannelListItem>
        ))}
      </ChannelList>
    </SidebarContainer>
  );
};

export default Sidebar;
