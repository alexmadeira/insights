import { Role } from '_DOM/enterprise/entities/value-objects'

describe('Domain', () => {
  describe('Entities', () => {
    describe('Value objects', () => {
      describe('Role', () => {
        it('should be able', async () => {
          const status = new Role('owner')

          expect(status.code).toBe('owner')
          expect(status.name).toBeTruthy()
        })
        it("should't be able when invalid code", async () => {
          const status = new Role('invalid-code')

          expect(status.code).toBeUndefined()
        })
      })
    })
  })
})
