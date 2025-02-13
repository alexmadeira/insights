import type { Member } from '_DOMEnt/entities/member'

export interface MemberRepository {
  findById(id: string): Promise<Member | null>
  create(avatar: Member): Promise<Member>
  save(avatar: Member): Promise<Member>
  delete(avatar: Member): Promise<void>
}
