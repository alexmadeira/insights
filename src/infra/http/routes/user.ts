import { RouteMethods } from '_COR/http/route/routes'
import { RouteSchemaDelete } from '_COR/http/route/schema/route-schema-delete'
import { RouteSchemaGet } from '_COR/http/route/schema/route-schema-get'
import { RouteSchemaPatch } from '_COR/http/route/schema/route-schema-patch'
import { RouteSchemaPost } from '_COR/http/route/schema/route-schema-post'
import { RouteSchemaPut } from '_COR/http/route/schema/route-schema-put'
import { routeUserPost } from '@INFTypes/http/routes/user'
import z from 'zod'

export const userRoutes = new RouteMethods()

userRoutes.post = RouteSchemaPost.create({
  path: '/:company',
  tags: ['user'],
  summary: 'Resumo da rota de criação de usuário',
  description: 'Descrição da rota de criação de usuário',
  body: routeUserPost.body,
  params: routeUserPost.params,
})

userRoutes.get = RouteSchemaGet.create({
  tags: ['user'],
  summary: 'Resumo da rota de busca de usuário',
  description: 'Descrição da rota de busca de usuário',
})

userRoutes.put = RouteSchemaPut.create({
  tags: ['user'],
  summary: 'Resumo da rota de atualização completaa de usuário',
  description: 'Descrição da rota de atualização de usuário',
  body: z.object({ user_name: z.string().min(3).max(255) }),
})

userRoutes.patch = RouteSchemaPatch.create({
  tags: ['user'],
  summary: 'Resumo da rota de atualização parcial de usuário',
  description: 'Descrição da rota de atualização de usuário',
  body: z.object({ user_name: z.string().min(3).max(255) }),
})

userRoutes.delete = RouteSchemaDelete.create({
  tags: ['user'],
  summary: 'Resumo da rota exclusão de usuário',
  description: 'Descrição da rota de exclusão de usuário',
})
