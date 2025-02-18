import type { Encrypter } from '_DOMApp/services/cryptography/encrypter'
import type { IPipe } from '@INFTypes/http/pipe'
import type { FastifyReply, FastifyRequest } from 'fastify'

export class VerifyJwt implements IPipe {
  constructor(private readonly encrypter: Encrypter) {}

  public async handler(request: FastifyRequest, _reply: FastifyReply) {
    const { authorization } = request.headers

    this.encrypter.verify(authorization)
  }
}
