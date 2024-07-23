import { Prisma } from '@prisma/client'

export const softDeleteExtension = Prisma.defineExtension({
  name: 'soft-delete',
  model: {
    $allModels: {
      async softDelete<T>(this: T, id: number, _args?: Prisma.Args<T, 'update'>['where']) {
        const context = Prisma.getExtensionContext(this)
        const result = await (context as any).update({
          where: { id },
          data: {
            deletedAt: new Date()
          }
        })
        return result
      }
    }
  }
})
