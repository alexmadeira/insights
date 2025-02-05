import z from 'zod'

export const zodKeys = <T extends z.ZodTypeAny>(schema?: T): string[] => {
  if (schema === null || schema === undefined) return []
  if (schema instanceof z.ZodNullable || schema instanceof z.ZodOptional) return zodKeys(schema.unwrap())
  if (schema instanceof z.ZodArray) return zodKeys(schema.element)
  if (schema instanceof z.ZodObject) {
    const entries = Object.entries(schema.shape)
    return entries.flatMap(([key, value]) => {
      const nested = value instanceof z.ZodType ? zodKeys(value).map((subKey) => `${key}.${subKey}`) : []
      return nested.length ? nested : key
    })
  }
  return []
}
