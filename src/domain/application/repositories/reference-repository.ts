import type { Reference } from '_DOMEnt/entities/reference'

export interface ReferenceRepository {
  findById(id: string): Promise<Reference | null>
  create(avatar: Reference): Promise<Reference>
  save(avatar: Reference): Promise<Reference>
  delete(avatar: Reference): Promise<void>
}
