import { Encrypter } from '_DOMApp/services/cryptography/encrypter'
import { FastifyReply, FastifyRequest } from 'fastify'

export interface IRoutePipe {
  handler(request: FastifyRequest, _reply: FastifyReply): Promise<void>
}

export class VerifyJwt implements IRoutePipe {
  constructor(private readonly encrypter: Encrypter) {}

  public async handler(request: FastifyRequest, _reply: FastifyReply) {
    const { authorization } = request.headers

    this.encrypter.verify(authorization)
  }
}
