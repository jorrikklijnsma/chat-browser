// ./src/utils/groupMessagesByDate.ts
import { Message, groupMessagesByDate } from '../types/Message';

const groupMessagesByDate = (messages: Message[]) => {
  // Group messages by their date
  const grouped: groupMessagesByDate = {};

  messages.forEach((message) => {
    const date = new Date(message.timestamp * 1000).toDateString(); // Convert timestamp to readable date
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(message);
  });

  return grouped;
};

export default groupMessagesByDate;
