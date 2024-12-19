import type { Network } from '_DOMEnt/entities/network'

export abstract class NetworkRepository {
  abstract findById(id: string): Promise<Network | null>
  abstract create(avatar: Network): Promise<void>
  abstract save(avatar: Network): Promise<void>
  abstract delete(avatar: Network): Promise<void>
}
