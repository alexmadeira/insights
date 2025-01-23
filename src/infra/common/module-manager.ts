type TConstructor<T = unknown, Args extends unknown[] = []> = new (...args: Args) => T
type TDependency<T> = TConstructor<T> | T

export class ModuleManager {
  static create<T, D extends unknown[]>(Module: TConstructor<T, D>, ...deps: { [K in keyof D]: TDependency<D[K]> }): T {
    return new Module(
      ...(deps.map((Dependency) => {
        if (typeof Dependency !== 'function') return Dependency
        return new (Dependency as TConstructor<D[number]>)()
      }) as D),
    )
  }
}
