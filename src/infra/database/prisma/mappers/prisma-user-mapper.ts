import type { Prisma, User as TPrismaUser } from '@prisma/client/'

import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { User } from '_DOMEnt/entities/user'

export class PrismaUserMapper {
  static toDomain(raw: TPrismaUser): User {
    return User.create(
      {
        name: raw.name,
        email: raw.email,
        hash: raw.passwordHash,
        indetifier: raw.indetifier,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPersistence(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      passwordHash: user.hash,
      indetifier: user.indetifier,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }
}
