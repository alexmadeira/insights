type TConstructor<T = unknown, Args extends unknown[] = []> = new (...args: Args) => T
type TDependency<T> = TConstructor<T> | T

export class ModuleManager {
  static create<T, D extends unknown[]>(Module: TConstructor<T, D>, ...deps: { [K in keyof D]: TDependency<D[K]> }): T {
    const instance = new Module(
      ...(deps.map((Dependency) => {
        if (typeof Dependency !== 'function') return Dependency
        return new (Dependency as TConstructor<D[number]>)()
      }) as D),
    )

    const proto = Object.getPrototypeOf(instance)

    for (const key of Object.getOwnPropertyNames(proto)) {
      const value = proto[key]
      if (key !== 'constructor' && typeof value === 'function') {
        instance[key as keyof T] = value.bind(instance)
      }
    }

    return instance
  }
}
