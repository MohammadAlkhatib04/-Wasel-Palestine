import { SetMetadata } from '@nestjs/common';
import { UserType } from 'src/utils/user.type';

export const Roles = (...roles: UserType[]) => SetMetadata('roles', roles);
//@Roles(UserType.ADMIN)
