import type { Avatar as TPrismaAvatar, Prisma } from '@prisma/client'

import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { Avatar } from '_DOMEnt/entities/avatar'

export class PrismaAvatarMapper {
  static toDomain(raw: TPrismaAvatar): Avatar {
    return Avatar.create(
      {
        name: raw.name,
        url: raw.url,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPersistence(avatar: Avatar): Prisma.AvatarUncheckedCreateInput {
    return {
      id: avatar.id.toString(),
      name: avatar.name,
      url: avatar.url,
      createdAt: avatar.createdAt,
      updatedAt: avatar.updatedAt,
    }
  }
}
