import type { User } from '_DOMEnt/entities/user'

export abstract class UserRepository {
  abstract findById(id: string): Promise<User | null>
  abstract create(avatar: User): Promise<void>
  abstract save(avatar: User): Promise<void>
  abstract delete(avatar: User): Promise<void>
}
