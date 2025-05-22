import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.config';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const exists = await this.prisma.auth.findUnique({
      where: { email: data.email },
    });

    if (exists) throw new ConflictException('Email already registered');

    const hashed = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.auth.create({
      data: {
        email: data.email,
        password: hashed,
        name: data.name,
      },
    });

    const token = this.jwtService.sign({ sub: user.id });
    return { accessToken: token };
  }

  async login(data: LoginDto) {
    const user = await this.prisma.auth.findUnique({
      where: { email: data.email },
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwtService.sign({ sub: user.id });

    return { accessToken: token };
  }
}
