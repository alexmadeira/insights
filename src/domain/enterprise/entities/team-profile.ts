import type { ITeamProfile, TTeamProfileProps } from '@DOMTypes/enterprise/entities/team-profile'
import type { UniqueEntityID } from '_COR/entities/unique-entity-id'

import { Entity } from '_COR/entities/entity'

export type * from '@DOMTypes/enterprise/entities/team-profile'

export class TeamProfile extends Entity<TTeamProfileProps> implements ITeamProfile {
  static create(props: TTeamProfileProps, id?: UniqueEntityID) {
    return new TeamProfile(props, id)
  }

  public get teamId() {
    return this._props.teamId
  }

  public get profileId() {
    return this._props.profileId
  }
}
