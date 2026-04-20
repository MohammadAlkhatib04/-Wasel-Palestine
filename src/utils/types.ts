import { UserType } from './user.type';

export type JWTPayloadType = {
  id: number;
  userType: UserType;
};
