import { randomUUID } from 'node:crypto'

import { UniqueEntityID } from '_COR/entities/unique-entity-id'
import { ROLES } from '_DOM/constants/role'
import { CompanyMember } from '_DOMEnt/entities/company-member'
import { MemberRole } from '_DOMEnt/entities/value-objects/member-role'
import { faker } from '@faker-js/faker'

type TMakeCompanyMemberProps = {
  companyId: UniqueEntityID
  memberId: string
  role: string
}

export function makeCompanyMember(props: Partial<TMakeCompanyMemberProps> = {}, id?: UniqueEntityID) {
  return CompanyMember.create(
    {
      companyId: props.companyId ?? new UniqueEntityID(),
      member: new MemberRole(props.memberId ?? randomUUID(), props.role ?? faker.helpers.arrayElement(ROLES)),
    },
    id,
  )
}
