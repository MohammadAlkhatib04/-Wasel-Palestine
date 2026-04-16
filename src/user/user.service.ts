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
import { JWTPayloadType } from 'src/utils/types';
import { LoginUserDto } from './dto/login-user.dto';
@Injectable()
export class UserService {
  [x: string]: any;
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
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
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      fullName,
      email,
      password: hashedPassword,
      phone,
    });
    const newUser = await this.userRepository.save(user);
    const payLoad: JWTPayloadType = {
      id: newUser.id,
      userType: newUser.userType,
    };
    const accessToken = await this.generateJWT(payLoad);
    return { accessToken };
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  public async loginUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid password');
    }
    const accessToken = await this.generateJWT({
      id: user.id,
      userType: user.userType,
    });
    return { accessToken };
  }

  public async getCurrentUser(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  public async getAllUsers() {
    return this.userRepository.find();
  }

  private generateJWT(payLoad: JWTPayloadType): Promise<string> {
    return this.jwtService.signAsync(payLoad);
  }
}
