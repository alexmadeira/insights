import type { Member } from '_DOMEnt/entities/member'

export interface MemberRepository {
  findById(id: string): Promise<Member | null>
  create(avatar: Member): Promise<void>
  save(avatar: Member): Promise<void>
  delete(avatar: Member): Promise<void>
}
