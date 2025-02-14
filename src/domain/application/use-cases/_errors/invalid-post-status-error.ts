import { UseCaseError } from '_COR/erros/use-case-error'
import { POST_STATUS } from '_DOM/constants/post'

export class InvalidPostStatusError extends UseCaseError {
  constructor(status: string) {
    super(`The post status '${status}' is invalid`, {
      name: 'InvalidPostStatusError',
      action: `Supported status: ${POST_STATUS.join(', ')}`,
      code: 'bad_request',
    })
  }
}
