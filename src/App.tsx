import React, { useState, useEffect } from 'react';
import FileUpload from './components/FileUpload';
import Sidebar from './components/Sidebar/Sidebar';
import { Channel, Message, User } from './types'; // Import your types
import { styled } from 'styled-components';
import ThreadDetail from './components/ThreadDetail/ThreadDetail';
import ChatArea from './components/ChatArea/ChatArea';

const PageWrapper = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr 350px; // Adjust as necessary, 350px for the thread panel
  grid-template-areas: 'sidebar chat thread';
  width: 100vw;
  min-height: 100vh;
  // Additional styling
`;

const Main = styled.main`
  grid-area: chat;
  // Rest of the styling
`;

const SidebarScroller = styled.aside`
  display: block;
  height: 100%;
  width: 250px;
  background-color: #3f0e40;
  color: white;
`;
const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  height: 100lvh;
  gap: 2rem;
  width: 100%;
  background-color: #3f0e40;
  color: white;
`;

const Nav = styled.nav`
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
`;

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  padding: 10px;
`;

const App: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  // Change messages to an object keyed by channel IDs
  const [messages, setMessages] = useState<Message[]>([]);
  const [allMessages, setAllMessages] = useState<{
    [channelId: string]: Message[];
  }>({});
  const [users, setUsers] = useState<User[]>([]);
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(
    null,
  );
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);

  const [isThreadPanelOpen, setIsThreadPanelOpen] = useState<boolean>(false);

  const [selectedThreadMessages, setSelectedThreadMessages] = useState<
    Message[]
  >([]);

  useEffect(() => {
    // Whenever selectedChannelId changes, update the state for messages
    if (selectedChannelId === null) {
      return;
    }
    fetchMessagesForChannel(selectedChannelId);
  }, [selectedChannelId]);

  // Handle file upload data...
  const handleChannelsLoaded = (loadedChannels: Channel[]) => {
    setChannels(loadedChannels);
    // Select the first channel by default:
    if (loadedChannels.length > 0) {
      setSelectedChannelId(loadedChannels[0].name);
    }
  };

  const handleMessagesLoaded = (loadedMessages: {
    [channelId: string]: Message[];
  }) => {
    // Instead of setting a state directly, store the messages in the existing messages object
    setMessages([]);
    setAllMessages(loadedMessages);
    console.log(loadedMessages);
    // If there's a selected channel, set the messages for it
    if (selectedChannelId) {
      fetchMessagesForChannel(selectedChannelId);
    }
  };

  const handleUsersLoaded = (loadedUsers: User[]) => {
    setUsers(loadedUsers);
  };

  const handleSelectChannel = (channelId: string) => {
    setSelectedChannelId(channelId);
    // Here you would fetch or filter messages for the selected channel.
    // For example, if you have a function that fetches messages by channel ID:
    fetchMessagesForChannel(channelId);
  };

  // Assuming you have a function that sets messages for the current channel
  const fetchMessagesForChannel = (channelId: string) => {
    // This is a placeholder for whatever logic you have to load messages.
    // This could be a network request or a filter on locally available data.
    // For example, if you have all messages loaded:
    const filteredMessages = allMessages[channelId];
    console.log(filteredMessages, channelId);
    setMessages(filteredMessages);
  };

  const handleSelectThread = (threadId: string) => {
    setSelectedThreadId(threadId);
    setIsThreadPanelOpen(true); // Open the thread panel when a thread is selected
    scrollToMessage(threadId); // Implement this function to scroll to the message in the main chat

    // const threadMessages = messages.filter(
    //   (message) => message.threadId === threadId,
    // );
    // setSelectedThreadMessages(threadMessages);
  };

  const handleCloseThread = () => {
    setIsThreadPanelOpen(false); // Close the thread panel
    if (selectedThreadId) {
      scrollToMessage(selectedThreadId); // Scroll to the message when closing the thread
    }
  };

  return (
    <PageWrapper className="App">
      <SidebarScroller>
        <Aside>
          <Nav>
            {channels.length > 0 ? (
              <Sidebar
                channels={channels}
                onSelectChannel={handleSelectChannel}
              />
            ) : (
              <p>Upload a zip file to get started!</p>
            )}
          </Nav>
          <Section>
            <FileUpload
              onChannelsLoaded={handleChannelsLoaded}
              onMessagesLoaded={handleMessagesLoaded}
              onUsersLoaded={handleUsersLoaded}
            />
          </Section>
        </Aside>
      </SidebarScroller>
      <Main>
        {/* {selectedChannelId && <MessageList messages={messages} users={users} />} */}
        {/* {selectedChannelId && (
          <MessageList
            messages={messages}
            users={users}
            onSelectThread={handleSelectThread}
          />
        )} */}
        {selectedChannelId && <ChatArea messages={messages} />}
        {selectedThreadMessages && isThreadPanelOpen && selectedThreadId && (
          <ThreadDetail
            threadId={selectedThreadId}
            threadMessages={selectedThreadMessages}
            onCloseThread={handleCloseThread} // Pass the handler to the ThreadDetail component
          />
        )}
      </Main>
    </PageWrapper>
  );
};

export default App;
