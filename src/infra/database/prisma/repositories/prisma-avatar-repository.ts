import type { AvatarRepository } from '_DOMApp/repositories/avatar-repository'
import type { Avatar } from '_DOMEnt/entities/avatar'
import type { PrismaClient } from '@prisma/client'

import { PrismaAvatarMapper } from '../mappers/prisma-avatar-mapper'

export class PrismaAvatarRepository implements AvatarRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(avatarId: string) {
    const avatar = await this.prisma.avatar.findUnique({
      where: {
        id: avatarId,
      },
    })

    if (!avatar) return null

    return PrismaAvatarMapper.toDomain(avatar)
  }

  async create(avatar: Avatar) {
    const createdAvatar = await this.prisma.avatar.create({ data: PrismaAvatarMapper.toPersistence(avatar) })
    return PrismaAvatarMapper.toDomain(createdAvatar)
  }

  async save(avatar: Avatar) {
    const data = PrismaAvatarMapper.toPersistence(avatar)

    const createdAvatar = await this.prisma.avatar.update({
      where: { id: data.id },
      data,
    })

    return PrismaAvatarMapper.toDomain(createdAvatar)
  }

  async delete(avatar: Avatar) {
    const data = PrismaAvatarMapper.toPersistence(avatar)

    await this.prisma.avatar.delete({
      where: { id: data.id },
    })
  }
}
