import { Route } from '_COR/http/routes/route'
import { userBody } from '@INFTypes/http/routes/user/post'
import { FastifyReply, FastifyRequest } from 'fastify'

export const userRoutes = new Route('/user')

async function controller(_request: FastifyRequest, reply: FastifyReply) {
  reply.send('controller')
}

userRoutes.get(
  {
    tags: ['User'],
    summary: 'Resumo da rota de busca de usuário',
    description: 'Descrição da rota de busca de usuário',
  },
  controller,
)
userRoutes.get(
  {
    path: '/all',
    tags: ['User'],
    summary: 'Resumo da rota de busca de usuário',
    description: 'Descrição da rota de busca de usuário',
  },
  controller,
)

userRoutes.post(
  {
    tags: ['User'],
    summary: 'Resumo da rota de busca de usuário',
    description: 'Descrição da rota de busca de usuário',
    body: userBody,
  },
  controller,
)

userRoutes.post(
  {
    tags: ['User'],
    summary: 'Resumo da rota de busca de usuário',
    description: 'Descrição da rota de busca de usuário',
    path: '/new',
    body: userBody,
  },
  controller,
)
userRoutes.put(
  {
    tags: ['User'],
    summary: 'Resumo da rota de busca de usuário',
    description: 'Descrição da rota de busca de usuário',
    body: userBody,
  },
  controller,
)
userRoutes.patch(
  {
    tags: ['User'],
    summary: 'Resumo da rota de busca de usuário',
    description: 'Descrição da rota de busca de usuário',
    body: userBody,
  },
  controller,
)

userRoutes.delete(
  {
    tags: ['User'],
    summary: 'Resumo da rota de busca de usuário',
    description: 'Descrição da rota de busca de usuário',
  },
  controller,
)
