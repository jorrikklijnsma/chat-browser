import { styled } from 'styled-components';
import { Message } from '../../types';
import formatTimestamp from '../../utils/FormatTimestamp';

// Define additional styled components for the message layout
const MessageWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 10px 20px;
  &:hover {
    background-color: #f8f8f8; // Light grey background on hover
  }
`;

const MessageAvatar = styled.img`
  width: 36px; // Slack uses 36x36 avatars in threads
  height: 36px;
  border-radius: 4px;
  margin-right: 12px;
`;

const MessageUsername = styled.span`
  font-weight: bold;
  color: #1264a3; // Slack's username color
  margin-right: 8px;
`;

const MessageTimestamp = styled.span`
  color: #606060;
  font-size: 0.875rem;
`;

const MessageContent = styled.div`
  color: #333333;
  font-size: 0.9375rem;
  white-space: pre-wrap; // Ensures that the whitespaces and new lines are respected
  word-wrap: break-word; // Breaks long words to prevent overflow
`;

interface Props {
  message: Message;
}

const ThreadMessage: React.FC<Props> = ({ message }) => {
  const formattedTime = formatTimestamp(message.ts);

  return (
    <MessageWrapper>
      <MessageAvatar src={message.user_profile.image_48} alt={message.user} />
      <MessageUsername>{message.user}</MessageUsername>
      <MessageTimestamp>{formattedTime}</MessageTimestamp>
      <MessageContent>{message.text}</MessageContent>
    </MessageWrapper>
  );
};

export default ThreadMessage;
