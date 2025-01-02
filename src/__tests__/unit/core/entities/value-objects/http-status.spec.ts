import { HttpStatus } from '_COR/entities/value-objects/http-status'

describe('Core', () => {
  describe('Entities', () => {
    describe('Value objects', () => {
      describe('HTTP Status', () => {
        it('should be able create new', async () => {
          const httpStatus = new HttpStatus('ok')

          expect(httpStatus.code).toBe(200)
          expect(httpStatus.category.code).toEqual('success')
          expect(httpStatus.message.code).toEqual('ok')
          expect(httpStatus.toJSON()).toEqual(
            expect.objectContaining({
              code: 200,
              category: expect.objectContaining({ code: 'success' }),
              message: expect.objectContaining({ code: 'ok' }),
            }),
          )
        })
        it('should be able create new with code number', async () => {
          const httpStatus = new HttpStatus(201)

          expect(httpStatus.code).toBe(201)
          expect(httpStatus.category.code).toEqual('success')
          expect(httpStatus.message.code).toEqual('created')
          expect(httpStatus.toJSON()).toEqual(
            expect.objectContaining({
              code: 201,
              category: expect.objectContaining({ code: 'success' }),
              message: expect.objectContaining({ code: 'created' }),
            }),
          )
        })

        it("should't be able when invalid code number", async () => {
          const httpStatus = new HttpStatus(600)

          expect(httpStatus.code).toBe(500)
          expect(httpStatus.category.code).toEqual('server_error')
          expect(httpStatus.message.code).toEqual('invalid_status_code')
          expect(httpStatus.toJSON()).toEqual(
            expect.objectContaining({
              code: 500,
              category: expect.objectContaining({ code: 'server_error' }),
              message: expect.objectContaining({ code: 'invalid_status_code' }),
            }),
          )
        })
      })
    })
  })
})
