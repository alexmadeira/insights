import { UseCaseError } from '_COR/erros/use-case-error'
import { REFERENCE_STATUS } from '_DOM/constants/reference'

export class InvalidReferenceStatusError extends UseCaseError {
  constructor(status: string) {
    super(`The reference status '${status}' is invalid`, {
      name: 'InvalidReferenceStatusError',
      action: `Supported status: ${REFERENCE_STATUS.join(', ')}`,
      code: 'bad_request',
    })
  }
}
