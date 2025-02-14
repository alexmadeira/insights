import type { UserRepository } from '_DOMApp/repositories/user-repository'
import type { User } from '_DOMEnt/entities/user'
import type { PrismaClient } from '@prisma/client'

import { PrismaUserMapper } from '../mappers/prisma-user-mapper'

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    })

    if (!user) return null

    return PrismaUserMapper.toDomain(user)
  }

  async findByIndetifier(indetifier: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { indetifier },
    })

    if (!user) return null

    return PrismaUserMapper.toDomain(user)
  }

  async findById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) return null

    return PrismaUserMapper.toDomain(user)
  }

  async create(user: User) {
    const createdUser = await this.prisma.user.create({ data: PrismaUserMapper.toPersistence(user) })
    return PrismaUserMapper.toDomain(createdUser)
  }

  async save(user: User) {
    const data = PrismaUserMapper.toPersistence(user)

    const createdUser = await this.prisma.user.update({
      where: { id: data.id },
      data,
    })

    return PrismaUserMapper.toDomain(createdUser)
  }

  async delete(user: User) {
    const data = PrismaUserMapper.toPersistence(user)

    await this.prisma.user.delete({
      where: { id: data.id },
    })
  }
}
