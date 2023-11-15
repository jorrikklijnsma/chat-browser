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
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(
    null,
  );
  const [selectedThreadTs, setSelectedThreadTs] = useState<string | null>(null);

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
    setAllMessages(loadedMessages);
    // If there's a selected channel, set the messages for it
    if (selectedChannelId) {
      fetchMessagesForChannel(selectedChannelId);
    }
  };

  const handleUsersLoaded = () => {};
  const handleSelectChannel = (channelId: string) => {
    setSelectedChannelId(channelId);
    // Here you would fetch or filter messages for the selected channel.
    // For example, if you have a function that fetches messages by channel ID:
    fetchMessagesForChannel(channelId);
  };

  const fetchMessagesForChannel = (channelId: string) => {
    console.log('fetchMessagesForChannel', allMessages);
    const filteredMessages = allMessages[channelId] || [];
    setMessages(filteredMessages);
  };

  // Keep a map of message refs
  const messageRefs = new Map<string, React.RefObject<any>>();

  const handleSelectThread = (thread_ts: string) => {
    setSelectedThreadTs(thread_ts);
    setIsThreadPanelOpen(true); // Open the thread panel when a thread is selected

    // If a ref for the thread starter message exists, scroll to it
    messageRefs.get(thread_ts)?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  };

  useEffect(() => {
    if (selectedThreadTs) {
      const activeThreadMessages = messages.filter(
        (message) =>
          message.ts === selectedThreadTs ||
          message.thread_ts === selectedThreadTs,
      );
      console.log('messages', messages);
      console.log('activeThreadMessages', activeThreadMessages);
      setSelectedThreadMessages(activeThreadMessages);
    }
  }, [selectedThreadTs, messages]); // Depend on selectedThreadTs and messages

  const handleCloseThread = () => {
    setIsThreadPanelOpen(false);
    setSelectedThreadTs(null);
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
        {selectedChannelId && (
          <ChatArea messages={messages} onSelectThread={handleSelectThread} />
        )}
        {selectedThreadMessages && isThreadPanelOpen && selectedThreadTs && (
          <ThreadDetail
            thread_ts={selectedThreadTs}
            threadMessages={selectedThreadMessages}
            onCloseThread={handleCloseThread} // Pass the handler to the ThreadDetail component
          />
        )}
      </Main>
    </PageWrapper>
  );
};

export default App;
