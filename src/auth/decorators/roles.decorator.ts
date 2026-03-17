import { SetMetadata } from '@nestjs/common';
import { UserType } from 'src/utils/user.type';
import { ROLES_KEY } from 'src/utils/constants';

export const Roles = (...roles: UserType[]) => SetMetadata(ROLES_KEY, roles);
