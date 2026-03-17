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
import { CurrentUser } from './decorator/current-user.decorator';
import type { JWTPayloadType } from 'src/utils/types';
import { AuthGuard } from './guards/auth.gard';
import { Roles } from './decorator/user-role.decorator';
import { UserType } from 'src/utils/user.type';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.registerUser(registerUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.userService.loginUser(loginUserDto);
  }

  @Get('current-user')
  @UseGuards(AuthGuard)
  public getCurrentUser(@CurrentUser() payload: JWTPayloadType) {
    return this.userService.getCurrentUser(payload.id);
  }
  // Just to understand how it works
  //**************************************************************************
  // @Get()
  // @Roles(UserType.ADMIN, UserType.CITIZEN)
  // @UseGuards(AuthRolesGuard)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @Roles(UserType.CITIZEN)
  public getAllUsers() {
    return this.userService.getAllUsers();
  }
}
