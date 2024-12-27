export class Acronym {
  private readonly _value: string

  constructor(fullName: string) {
    this._value = this.format(fullName)
  }

  private format(fullName: string) {
    const words = fullName.toLowerCase().trim().split(/\s+/)

    if (words.length === 1) return words[0][0]
    return words[0][0] + words[words.length - 1][0]
  }

  public get value() {
    return this._value
  }
}
