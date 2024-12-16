import { NetworkStatus } from '_DOMEnt/entities/value-objects/network-status'
import { ReferenceStatus } from '_DOMEnt/entities/value-objects/reference-status'

describe('Domain', () => {
  describe('Entities', () => {
    describe('Value objects', () => {
      describe('Status', () => {
        describe('Create', () => {
          describe('Network', () => {
            it('should be able', async () => {
              const status = NetworkStatus.create('active')

              expect(status.code).toBe('active')
              expect(status.name).toBeTruthy()
            })
            it('should`t be able when invalid code', async () => {
              const status = NetworkStatus.create('invalid-code')

              expect(status.code).toBeUndefined()
            })
          })
          describe('Reference', () => {
            it('should be able', async () => {
              const status = ReferenceStatus.create('active')

              expect(status.code).toBe('active')
              expect(status.name).toBeTruthy()
            })
            it('should`t be able when invalid code', async () => {
              const status = ReferenceStatus.create('invalid-code')

              expect(status.code).toBeUndefined()
            })
          })
        })
      })
    })
  })
})
