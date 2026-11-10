import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Connected to PostgreSQL via Prisma');
    } catch (err: any) {
      this.logger.warn(
        `Database connection deferred (PostgreSQL not connected at ${process.env.DATABASE_URL}): ${err.message}`,
      );
    }
  }
}
