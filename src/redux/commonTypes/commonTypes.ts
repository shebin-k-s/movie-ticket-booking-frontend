

export interface BaseResponse {
  success: boolean;
  message: string;
}

export interface User {
  userId: string;
  name: string;
  email: string;
  role: UserRoleType;
}

export const UserRole = {
  USER: 'user',
  THEATER_ADMIN: 'theater_admin',
  ADMIN: 'admin',
} as const;


export type UserRoleType = typeof UserRole[keyof typeof UserRole];
