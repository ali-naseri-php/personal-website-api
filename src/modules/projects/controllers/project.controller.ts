import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { ProjectService } from '../services/project.service';
import { CreateDto } from '../dto/create.dto';
import { AuthRequest } from 'src/shared/types/auth.request';

@Controller('project')
export class ProjectController {
  constructor(private readonly ProjectService: ProjectService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  register(@Body() body: CreateDto, @Request() req: AuthRequest) {
    const userId = req.user.userId;
    return this.ProjectService.create(body, userId);
  }
}
