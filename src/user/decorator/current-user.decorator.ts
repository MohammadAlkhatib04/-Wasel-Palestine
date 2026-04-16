import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JWTPayloadType } from 'src/utils/types';
import { CURRENT_USER_KEY } from 'src/utils/constants';

export const CurrentUser = createParamDecorator(
  (data: keyof JWTPayloadType | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user: JWTPayloadType = request[CURRENT_USER_KEY];

    return data ? user?.[data] : user;
  },
);