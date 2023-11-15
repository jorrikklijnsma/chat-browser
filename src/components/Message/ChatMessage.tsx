import { styled } from 'styled-components';
import { Message } from '../../types';
import formatTimestamp from '../../utils/FormatTimestamp';

// Define additional styled components for the message layout
const MessageWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 10px 20px;
  color: white;
  background-color: #222; // dark grey background

  &:hover {
    background-color: #f8f8f8; // Light grey background on hover
    color: #333;
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

const MessageValue = styled.div`
  font-size: 0.9375rem;
  white-space: pre-wrap; // Ensures that the whitespaces and new lines are respected
  word-wrap: break-word; // Breaks long words to prevent overflow
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const MessageHeader = styled.div`
  display: flex;
  align-items: center;
`;

interface Props {
  message: Message;
}

const ThreadMessage: React.FC<Props> = ({ message }) => {
  const formattedTime = formatTimestamp(message.ts);

  return (
    <MessageWrapper>
      {message.user_profile?.image_72 && (
        <MessageAvatar src={message.user_profile.image_72} alt={message.user} />
      )}

      <MessageContent>
        <MessageHeader>
          {message.user_profile?.display_name && (
            <MessageUsername>
              {message.user_profile.display_name}
            </MessageUsername>
          )}
          <MessageTimestamp>{formattedTime}</MessageTimestamp>
        </MessageHeader>
        <MessageValue>{message.text}</MessageValue>
        {/* Display reactions if present */}
      </MessageContent>
    </MessageWrapper>
  );
};

export default ThreadMessage;
