import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JWTPayloadType } from 'src/utils/types';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const { fullName, email, password, phone } = registerUserDto;
    const emailExists = await this.userRepository.findOne({ where: { email } });
    if (emailExists) {
      throw new ConflictException('User already exists');
    }

    if (phone) {
      const phoneExists = await this.userRepository.findOne({
        where: { phone },
      });
      if (phoneExists) {
        throw new ConflictException('Phone already exists');
      }
    }

    const hashedPassword = await this.hashData(password);

    const user = this.userRepository.create({
      fullName,
      email,
      password: hashedPassword,
      phone,
    });

    const newUser = await this.userRepository.save(user);
    const tokens = await this.generateAuthTokens({
      id: newUser.id,
      userType: newUser.userType,
    });

    await this.updateRefreshTokenHash(newUser.id, tokens.refreshToken);

    return {
      message: 'User registered successfully',
      data: {
        user: this.sanitizeUser(newUser),
        ...tokens,
      },
    };
  }

  public async loginUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    if (!(await bcrypt.compare(password, user.password!))) {
      throw new UnauthorizedException('Invalid password');
    }

    const tokens = await this.generateAuthTokens({
      id: user.id,
      userType: user.userType,
    });

    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);

    return {
      message: 'Login successful',
      data: {
        user: this.sanitizeUser(user),
        ...tokens,
      },
    };
  }

  public async refreshUserToken(refreshToken: string) {
    let payload: JWTPayloadType;

    try {
      payload = await this.jwtService.verifyAsync<JWTPayloadType>(
        refreshToken,
        {
          secret:
            this.configService.get<string>('JWT_REFRESH_SECRET') ??
            this.configService.get<string>('JWT_SECRET'),
        },
      );
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.refreshTokenHash')
      .where('user.id = :id', { id: payload.id })
      .getOne();

    if (!user || !user.refreshTokenHash) {
      throw new UnauthorizedException('Refresh token is not available');
    }

    const isRefreshTokenValid = await bcrypt.compare(
      refreshToken,
      user.refreshTokenHash,
    );

    if (!isRefreshTokenValid) {
      throw new UnauthorizedException('Refresh token is invalid');
    }

    const tokens = await this.generateAuthTokens({
      id: user.id,
      userType: user.userType,
    });

    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);

    return {
      message: 'Token refreshed successfully',
      data: tokens,
    };
  }

  public async logoutUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.update({ id }, { refreshTokenHash: null });

    return {
      message: 'Logout successful',
    };
  }

  public async getCurrentUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
  public async getCurrentUserProfile(id: number) {
    const user = await this.getCurrentUser(id);
    return this.sanitizeUser(user);
  }

  public async getAllUsers() {
    const users = await this.userRepository.find();
    return users.map((user) => this.sanitizeUser(user));
  }

  private async generateAuthTokens(payload: JWTPayloadType) {
    const accessExpiresIn =
      this.configService.get<string>('JWT_EXPIRES_IN') || '1d';

    const refreshExpiresIn =
      this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') || '7d';

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET') as string,
      expiresIn: accessExpiresIn as any,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret:
        (this.configService.get<string>('JWT_REFRESH_SECRET') as string) ||
        (this.configService.get<string>('JWT_SECRET') as string),
      expiresIn: refreshExpiresIn as any,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private async updateRefreshTokenHash(
    userId: number,
    refreshToken: string | null,
  ) {
    const refreshTokenHash = refreshToken
      ? await this.hashData(refreshToken)
      : null;

    await this.userRepository.update({ id: userId }, { refreshTokenHash });
  }

  private async hashData(value: string) {
    return bcrypt.hash(value, 10);
  }

  private sanitizeUser(user: User) {
    const { password, refreshTokenHash, ...safeUser } = user as User & {
      password?: string;
      refreshTokenHash?: string | null;
    };

    return safeUser;
  }
}
