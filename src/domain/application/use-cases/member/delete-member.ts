import type { MemberRepository } from '_DOMApp/repositories/member-repository'
import type {
  IDeleteMemberUseCase,
  TDeleteMemberUseCaseRequest,
  TDeleteMemberUseCaseResponse,
} from '@DOMTypes/application/use-cases/member/delete-member'

import { left, right } from '_COR/either'

import { ResourceNotFoundError } from '../_errors/resource-not-found-error'

export class DeleteMemberUseCase implements IDeleteMemberUseCase {
  constructor(private readonly memberRepository: MemberRepository) {}

  async execute({ memberId }: TDeleteMemberUseCaseRequest): Promise<TDeleteMemberUseCaseResponse> {
    const member = await this.memberRepository.findById(memberId)

    if (!member) {
      return left(new ResourceNotFoundError())
    }

    await this.memberRepository.delete(member)

    return right(null)
  }
}
