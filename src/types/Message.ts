import { UserProfile } from './User';

export interface BroadcastElement {
  type: 'broadcast';
  range: string;
}

export interface TextElement {
  type: 'text';
  text: string;
}

export interface Attachment {
  id: string;
  type: 'image' | 'video' | 'file';
  url: string;
}

export interface Thread {
  id: string;
  messages: Message[];
}

export interface MessageBlock {
  type: 'rich_text';
  block_id: string;
  elements: MessageElement[];
}

export type RichTextElement = BroadcastElement | TextElement;

export interface RichTextSectionElement {
  type: 'rich_text_section';
  elements: RichTextElement[];
}

export interface MessageReply {
  user: string;
  ts: string;
}

export type MessageElement = RichTextSectionElement;

export interface Message {
  client_msg_id: string;
  type: 'message' | 'system';
  id: string;
  userId: string;
  timestamp: number;
  threadId?: string;
  attachments?: Attachment[];
  text: string;
  user: string;
  ts: string;
  blocks: MessageBlock[];
  team: string;
  user_team: string;
  source_team: string;
  user_profile: UserProfile;
  thread_ts: string;
  reply_count?: number;
  reply_users_count?: number;
  latest_reply?: string;
  reply_users?: string[];
  replies?: MessageReply[];
  is_locked: boolean;
  subscribed: boolean;
  parent_user_id?: string;
}
