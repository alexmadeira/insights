export class Acronym {
  private readonly _value: string

  protected constructor(private readonly fullName: string) {
    this._value = this.format()
  }

  static create(value: string) {
    return new Acronym(value)
  }

  private format() {
    const words = this.fullName.toLowerCase().trim().split(/\s+/)

    if (words.length === 1) return words[0][0]
    return words[0][0] + words[words.length - 1][0]
  }

  public get value() {
    return this._value
  }
}
