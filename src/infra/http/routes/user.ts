import { userBody, userResponse } from '@INFTypes/http/routes/user/post'
import { RouteMethods } from '_COR/http/route/routes'
import { RouteSchemaDelete } from '_COR/http/route/schema/route-schema-delete'
import { RouteSchemaGet } from '_COR/http/route/schema/route-schema-get'
import { RouteSchemaPatch } from '_COR/http/route/schema/route-schema-patch'
import { RouteSchemaPost } from '_COR/http/route/schema/route-schema-post'
import { RouteSchemaPut } from '_COR/http/route/schema/route-schema-put'

export const userRoutes = new RouteMethods()

userRoutes.post = RouteSchemaPost.create({
  tags: ['user'],
  summary: 'Resumo da rota de criação de usuário',
  description: 'Descrição da rota de criação de usuário',
  body: userBody,
  response: userResponse,
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
  body: userBody,
})

userRoutes.patch = RouteSchemaPatch.create({
  tags: ['user'],
  summary: 'Resumo da rota de atualização parcial de usuário',
  description: 'Descrição da rota de atualização de usuário',
  body: userBody,
})

userRoutes.delete = RouteSchemaDelete.create({
  tags: ['user'],
  summary: 'Resumo da rota exclusão de usuário',
  description: 'Descrição da rota de exclusão de usuário',
})
