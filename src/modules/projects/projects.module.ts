import { Module } from '@nestjs/common';
import { PrismaModule } from '../../config/prisma.module';
import { MideModule } from '../../shared/shared.module';
import { ProjectService } from './services/project.service';
import { ProjectController } from './controllers/project.controller';
@Module({
  imports: [PrismaModule, MideModule],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectsModule {}
