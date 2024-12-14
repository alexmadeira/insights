import { Slug } from '_DOMEnt/entities/value-objects/slug'

describe('Domain', () => {
  describe('Entities', () => {
    describe('Value Objects', () => {
      describe('Slug', () => {
        it('should be able to create a new slug from text', async () => {
          const slug = Slug.createFromText('An example text')

          expect(slug.value).toBe('an-example-text')
        })
        it('should be able to create a new slug from slug text', async () => {
          const slug = new Slug('an-example-text')

          expect(slug.value).toBe('an-example-text')
        })
      })
    })
  })
})
