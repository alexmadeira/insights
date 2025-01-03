import type { Network } from '_DOMEnt/entities/network'

export interface NetworkRepository {
  findById(id: string): Promise<Network | null>
  create(avatar: Network): Promise<void>
  save(avatar: Network): Promise<void>
  delete(avatar: Network): Promise<void>
}
