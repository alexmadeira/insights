import z from 'zod'

export const ZPostProps = z.object({
  title: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

export const ZPost = z.object({
  title: z.string(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
})

//
//
//

export type TPostProps = z.infer<typeof ZPostProps>
export interface IPost extends z.infer<typeof ZPost> {}
