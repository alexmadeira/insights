import { app } from './app'
import { env } from './env'

app.listen({ port: env.SERVER_PORT, host: '0.0.0.0' }).then((server) => {
  console.log(`Http server running in: ${server}`)
})
