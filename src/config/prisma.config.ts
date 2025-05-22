import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  INestApplication,
} from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

type PrismaClientEvents = Parameters<PrismaClient['$on']>[0];
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }

  enableShutdownHooks(app: INestApplication): void {
    this.$on('beforeExit' as PrismaClientEvents, () => {
      void app.close().then(() => {
        console.log('App closed on Prisma beforeExit event.');
      });
    });
  }
}
