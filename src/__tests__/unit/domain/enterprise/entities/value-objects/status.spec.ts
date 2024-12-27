import { ReferenceStatus } from '_DOMEnt/entities/value-objects'

describe('Domain', () => {
  describe('Entities', () => {
    describe('Value objects', () => {
      describe('Status', () => {
        describe('Create', () => {
          describe('Reference', () => {
            it('should be able', async () => {
              const status = new ReferenceStatus('active')

              expect(status.code).toBe('active')
              expect(status.name).toBeTruthy()
            })
            it('should`t be able when invalid code', async () => {
              const status = new ReferenceStatus('invalid-code')

              expect(status.code).toBeUndefined()
            })
          })
        })
      })
    })
  })
})
