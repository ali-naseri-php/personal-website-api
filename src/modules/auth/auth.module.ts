import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { PrismaModule } from 'src/config/prisma.module';
import { MideModule } from 'src/shared/shared.module';

@Module({
  imports: [PrismaModule, MideModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
