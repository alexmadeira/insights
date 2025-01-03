import type { Reference } from '_DOMEnt/entities/reference'

export interface ReferenceRepository {
  findById(id: string): Promise<Reference | null>
  create(avatar: Reference): Promise<void>
  save(avatar: Reference): Promise<void>
  delete(avatar: Reference): Promise<void>
}
