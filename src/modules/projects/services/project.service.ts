import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.config';
import { CreateDto } from '../dto/create.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateDto, userId: string) {
    const create = await this.prisma.project.create({
      data: {
        name: data.name,
        body: data.body,
        user_id: userId,
      },
    });

    return !!(create.user_id && create.project_id);
  }
}
