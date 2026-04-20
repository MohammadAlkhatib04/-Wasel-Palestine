import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { CurrentUser } from './decorator/current-user.decorator';
import type { JWTPayloadType } from 'src/utils/types';
import { AuthGuard } from '../auth/guards/auth.gard';
import { Roles } from './decorator/user-role.decorator';
import { UserType } from 'src/utils/user.type';
import { AuthRolesGuard } from '../auth/guards/auth-roles.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.registerUser(registerUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.userService.loginUser(loginUserDto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.userService.refreshUserToken(refreshTokenDto.refreshToken);
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@CurrentUser() payload: JWTPayloadType) {
    return this.userService.logoutUser(payload.id);
  }

  @Get('current-user')
  @UseGuards(AuthGuard)
  getCurrentUser(@CurrentUser('id') id: number) {
    return this.userService.getCurrentUserProfile(id);
  }

  @Get()
  @Roles(UserType.ADMIN)
  @UseGuards(AuthRolesGuard)
  public getAllUsers() {
    return this.userService.getAllUsers();
  }
}
