import { Inject, Injectable, type OnModuleDestroy, OnModuleInit, Optional } from '@nestjs/common'
import { Prisma, PrismaClient } from '@prisma/client'

import { PRISMA_SERVICE_OPTIONS } from './prisma.constants'
import { type PrismaServiceOptions } from './prisma.interfaces'

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>
  implements OnModuleInit, OnModuleDestroy
{
  constructor(
    @Optional()
    @Inject(PRISMA_SERVICE_OPTIONS)
    private readonly options: PrismaServiceOptions = {}
  ) {
    super(options.prismaOptions)

    if (this.options.middlewares) {
      this.options.middlewares.forEach((middleware) => this.$use(middleware))
    }
  }

  async onModuleInit() {
    if (this.options.explicitConnect) {
      await this.$connect()
    }
  }

  // NOTE: Use `onModuleDestroy` to ensure that the database is disconnected when the application is shut down.
  async onModuleDestroy() {
    await this.$disconnect()
  }
}
