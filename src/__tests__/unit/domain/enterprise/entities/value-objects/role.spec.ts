import { Role } from '_DOMEnt/entities/value-objects'

describe('Domain', () => {
  describe('Entities', () => {
    describe('Value objects', () => {
      describe('Role', () => {
        it('should be able', async () => {
          const status = Role.create('owner')

          expect(status.code).toBe('owner')
          expect(status.name).toBeTruthy()
        })
        it('should`t be able when invalid code', async () => {
          const status = Role.create('invalid-code')

          expect(status.code).toBeUndefined()
        })
      })
    })
  })
})
