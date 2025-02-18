import type { Network } from '_DOM/enterprise/entities/network'

export interface NetworkRepository {
  findById(id: string): Promise<Network | null>
  create(avatar: Network): Promise<Network>
  save(avatar: Network): Promise<Network>
  delete(avatar: Network): Promise<void>
}
