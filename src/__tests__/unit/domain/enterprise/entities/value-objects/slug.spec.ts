import { Slug } from '_DOM/enterprise/entities/value-objects'

describe('Domain', () => {
  describe('Entities', () => {
    describe('Value objects', () => {
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
