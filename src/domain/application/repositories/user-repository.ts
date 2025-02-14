import type { User } from '_DOMEnt/entities/user'

export interface UserRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findByIndetifier(indetifier: string): Promise<User | null>
  create(avatar: User): Promise<User>
  save(avatar: User): Promise<User>
  delete(avatar: User): Promise<void>
}
