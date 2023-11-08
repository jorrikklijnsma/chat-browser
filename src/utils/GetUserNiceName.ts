import { User } from '../types';

export const getUserNiceName = (userId: string, users: User[]): string => {
  const user = users.find((user) => user.id === userId);
  return user?.real_name || 'Unknown User';
};
