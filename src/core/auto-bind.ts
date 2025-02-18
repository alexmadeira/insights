export abstract class AutoBind<TProps> {
  protected readonly _props: TProps

  protected constructor(props: TProps) {
    this._props = props

    this._autoBind()
  }

  private _autoBind() {
    const propertyNames = Object.getOwnPropertyNames(Object.getPrototypeOf(this))
    for (const name of propertyNames) {
      const property = this[name as keyof this]
      if (typeof property === 'function' && name !== 'constructor') {
        this[name as keyof this] = property.bind(this)
      }
    }
  }
}
