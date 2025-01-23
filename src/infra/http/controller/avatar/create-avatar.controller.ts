import { Controller } from '_INFCommon/controller'
import { ICreateAvatarUseCase } from '@DOMTypes/application/use-cases/avatar/create-avatar'

export class CreateAvatarController extends Controller {
  constructor(private readonly createAvatarUseCase: ICreateAvatarUseCase) {
    super()
  }

  public async handle() {}
}
