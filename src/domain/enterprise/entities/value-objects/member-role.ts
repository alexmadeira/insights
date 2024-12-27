import { UniqueEntityID } from '_COR/entities/unique-entity-id'

import { Role } from './role'

export class MemberRole {
  private readonly _id: UniqueEntityID
  private readonly _role: Role

  constructor(meberId: string, memberRole: string) {
    this._id = new UniqueEntityID(meberId)
    this._role = new Role(memberRole)
  }

  public get memberId() {
    return this._id
  }

  public get memberRole() {
    return this._role
  }

  public equals(memberRole: MemberRole) {
    return memberRole.memberId.equals(this.memberId)
  }
}
