// src/types/Message.ts
export interface MessageBlockElement {
  type: string;
  text: string;
}

export interface MessageBlock {
  type: string;
  block_id: string;
  elements: {
    type: string;
    elements: MessageBlockElement[];
  }[];
}

export interface UserProfile {
  avatar_hash: string;
  image_72: string;
  first_name: string;
  real_name: string;
  display_name: string;
  team: string;
  name: string;
  is_restricted: boolean;
  is_ultra_restricted: boolean;
}

export interface MessageReply {
  user: string;
  ts: string;
}

export interface Message {
  client_msg_id: string;
  type: string;
  text: string;
  user: string;
  ts: string;
  blocks: MessageBlock[];
  team: string;
  user_team: string;
  source_team: string;
  user_profile: UserProfile;
  thread_ts: string;
  reply_count: number;
  reply_users_count: number;
  latest_reply: string;
  reply_users: string[];
  replies: MessageReply[];
  is_locked: boolean;
  subscribed: boolean;
  last_read: string;
}
