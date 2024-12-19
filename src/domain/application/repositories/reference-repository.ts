import type { Reference } from '_DOMEnt/entities/reference'

export abstract class ReferenceRepository {
  abstract findById(id: string): Promise<Reference | null>
  abstract create(avatar: Reference): Promise<void>
  abstract save(avatar: Reference): Promise<void>
  abstract delete(avatar: Reference): Promise<void>
}
