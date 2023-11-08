import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import { Channel, Message, User } from './types'; // Import your types
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  // State declarations here...
  const [channels, setChannels] = useState<Channel[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(
    null,
  );
  // Other state related to messages and users...

  // Handle file upload data...
  const handleChannelsLoaded = (loadedChannels: Channel[]) => {
    setChannels(loadedChannels);
    // Select the first channel by default:
    if (loadedChannels.length > 0) {
      setSelectedChannelId(loadedChannels[0].id);
    }
  };

  const handleMessagesLoaded = (loadedMessages: {
    [channel: string]: Message[];
  }) => {
    setMessages(loadedMessages[selectedChannelId || ''] || []);
  };

  const handleUsersLoaded = (loadedUsers: User[]) => {
    setUsers(loadedUsers);
  };

  const handleSelectChannel = (channelId: string) => {
    setSelectedChannelId(channelId);
    // You will need to load messages for this channel
  };

  // Render and other JSX...
  return (
    <div className="App">
      <FileUpload
        onChannelsLoaded={handleChannelsLoaded}
        onMessagesLoaded={handleMessagesLoaded}
        onUsersLoaded={handleUsersLoaded}
      />
      <Sidebar channels={channels} onSelectChannel={handleSelectChannel} />
      {/* Message and User components go here */}
    </div>
  );
};

export default App;

const App_bak: React.FC = () => {
  return <div className="App">{/* Other components */}</div>;
};
