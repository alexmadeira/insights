import { IEntityError } from '_COR/_errors/entity-error'

export class InvalidTypeError extends Error implements IEntityError {
  constructor() {
    super('Invalid type')
  }
}
