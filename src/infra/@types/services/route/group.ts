import z from 'zod'

export const ZRouteGroupName = z.union([z.string(), z.array(z.string())])
export const ZRouteGroupBasePath = z.string()

export const ZRouteGroup = z.object({
  name: ZRouteGroupName,
  basePath: ZRouteGroupBasePath,
})

//
//
//

export type TRouteGroupName = z.infer<typeof ZRouteGroupName>
export type TRouteGroupBasePath = z.infer<typeof ZRouteGroupBasePath>

export interface IRouteGroup extends z.infer<typeof ZRouteGroup> {}
