import type { ZodTypeAny } from 'zod'

export abstract class Status<TStatus extends string> {
  private readonly _code?: TStatus

  protected constructor(
    private readonly value: string,
    private readonly validator: ZodTypeAny,
    private readonly codeParse?: Record<TStatus, string>,
  ) {
    this._code = this.checkCode()
  }

  private checkCode() {
    const { success, data } = this.validator.safeParse(this.value)

    if (success) return data
  }

  public get code() {
    return this._code
  }

  public get name() {
    if (!this._code) return
    if (!this.codeParse) return this._code

    return this.codeParse[this._code]
  }
}
