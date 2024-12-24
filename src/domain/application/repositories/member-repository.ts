import type { Member } from '_DOMEnt/entities/member'

export abstract class MemberRepository {
  abstract findById(id: string): Promise<Member | null>
  abstract create(avatar: Member): Promise<void>
  abstract save(avatar: Member): Promise<void>
  abstract delete(avatar: Member): Promise<void>
}
