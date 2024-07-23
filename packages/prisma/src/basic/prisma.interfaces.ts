import type { ModuleMetadata, Type } from '@nestjs/common'
import type { Prisma } from '@prisma/client'

export interface PrismaModuleOptions {
  /**
   * If `true`, registers `PrismaModule` as a global module.
   * @See https://docs.nestjs.com/modules#global-modules
   */
  isGlobal?: boolean
  /**
   * Options for `PrismaService`.
   */
  prismaServiceOptions?: PrismaServiceOptions
}

export interface PrismaServiceOptions {
  /**
   * Pass options directly to the `PrismaClient`.
   * @see https://www.prisma.io/docs/reference/api-reference/prisma-client-reference/#prismaclient
   */
  prismaOptions?: Prisma.PrismaClientOptions
  /**
   * If `true`, the `PrismaClient` explicitly creates a connection pool and your first query will respond instantly.
   * For most use cases the lazy connect behavior of `PrismaClient` will do. The first query of `PrismaClient` creates the connection pool.
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/connection-management
   */
  explicitConnect?: boolean
  /**
   * Apply Prisma middlewares to perform actions before or after db queries.
   * @deprecated
   * @see https://www.prisma.io/docs/orm/prisma-client/client-extensions/middleware
   */
  middlewares?: Prisma.Middleware[]
}

export interface PrismaOptionsFactory {
  createPrismaOptions: () => PrismaServiceOptions | Promise<PrismaServiceOptions>
}

export interface PrismaModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  /**
   * If `true`, registers `PrismaModule` as a global module.
   * @See https://docs.nestjs.com/modules#global-modules
   */
  isGlobal?: boolean
  useExisting?: Type<PrismaOptionsFactory>
  useClass?: Type<PrismaOptionsFactory>
  useFactory?: (...args: any[]) => PrismaServiceOptions | Promise<PrismaServiceOptions>
  inject?: any[]
}
