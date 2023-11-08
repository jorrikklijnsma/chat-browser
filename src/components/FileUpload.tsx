import React, { ChangeEvent, useState } from 'react';
import JSZip from 'jszip';
import { Channel, Message, User } from '../types'; // Assuming you have an index.ts file exporting all types

interface Props {
  onChannelsLoaded: (channels: Channel[]) => void;
  onMessagesLoaded: (messages: { [channelId: string]: Message[] }) => void;
  onUsersLoaded: (users: User[]) => void;
}

const FileUpload: React.FC<Props> = ({
  onChannelsLoaded,
  onMessagesLoaded,
  onUsersLoaded,
}) => {
  const [isFileLoading, setIsFileLoading] = useState(false);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setIsFileLoading(true);
      const file = files[0];
      const zip = new JSZip();

      try {
        const zipContents = await zip.loadAsync(file);

        // Read 'channels.json' and 'users.json' files
        const channelsJsonPromise = zipContents
          .file('channels.json')
          ?.async('string');
        const usersJsonPromise = zipContents
          .file('users.json')
          ?.async('string');

        // Extract channel messages as promises of string
        const messageJsonPromises: Promise<{
          channelId: string;
          date: string;
          content: string;
        }>[] = [];
        zipContents.forEach((relativePath, fileEntry) => {
          if (!fileEntry.dir) {
            const pathParts = relativePath.split('/');
            // Assuming a structure like 'channelName/YYYY-MM-DD.json'
            if (pathParts.length > 1) {
              const channelId = pathParts[0]; // This should be the channel's ID or name
              const date = pathParts[1].replace('.json', ''); // Extract date from the filename
              const promise = fileEntry
                .async('string')
                .then((content) => ({ channelId, date, content }));
              messageJsonPromises.push(promise);
            }
          }
        });

        // Wait for all promises to resolve
        const [channelsJson, usersJson, ...messageJsons] = await Promise.all([
          channelsJsonPromise,
          usersJsonPromise,
          ...messageJsonPromises,
        ]);

        // Parse the JSON strings into objects
        const channels: Channel[] = channelsJson
          ? JSON.parse(channelsJson)
          : [];
        const users: User[] = usersJson ? JSON.parse(usersJson) : [];
        const messages: { [channelId: string]: Message[] } = {};

        // Process each messages JSON
        messageJsons.forEach(({ channelId, content }) => {
          const messagesArray: Message[] = JSON.parse(content);
          if (!messages[channelId]) {
            messages[channelId] = [];
          }
          messages[channelId] = messages[channelId].concat(messagesArray);
        });

        // Call the callback props with the loaded data
        onChannelsLoaded(channels);
        onMessagesLoaded(messages);
        onUsersLoaded(users);
      } catch (error) {
        console.error('Error reading zip file:', error);
      } finally {
        setIsFileLoading(false);
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        disabled={isFileLoading}
        accept=".zip"
      />
      {isFileLoading && <p>Loading files...</p>}
    </div>
  );
};

export default FileUpload;
