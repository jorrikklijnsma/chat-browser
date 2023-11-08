import React from 'react';
import styled from 'styled-components';
import { Channel } from '../types';

const SidebarContainer = styled.div``;

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
            onClick={() => onSelectChannel(channel.name)}
          >
            # {channel.name}
          </ChannelListItem>
        ))}
      </ChannelList>
    </SidebarContainer>
  );
};

export default Sidebar;
