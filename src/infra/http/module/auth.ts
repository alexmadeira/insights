import { env } from '_INF/env'
import { VerifyJwt } from '_INFHttp/pipes/verify-jwt'
import { BcryptHasher } from '_INFServices/cryptography/bcrypt-hasher'
import { JwtEncrypter } from '_INFServices/cryptography/jwt-encrypter'
import { ModuleManager } from '_INFServices/module-manager'

export const hasher = ModuleManager.create(BcryptHasher)
export const encrypter = ModuleManager.create(
  JwtEncrypter,
  Buffer.from(env.JWT_PRIVATE_KEY, 'base64'),
  Buffer.from(env.JWT_PUBLIC_KEY, 'base64'),
)

export const verifyJwt = ModuleManager.create(VerifyJwt, encrypter)
