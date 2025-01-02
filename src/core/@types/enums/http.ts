import { HTTP_RESPONSE_CATEGORIES, HTTP_RESPONSE_CODE } from '_COR/constants/http'
import { httpResponseCategoryCode } from '_COR/constants/parse/http'
import z from 'zod'

export const ZEHttpResponseCode = z.enum(HTTP_RESPONSE_CODE).default('invalid_status_code')
export const ZEHttpResponseCategory = z.enum(HTTP_RESPONSE_CATEGORIES).default('server_error')

export const ZHttpStatusCodeCategory = z.number().transform((statusCode) => {
  const categoryCode = statusCode.toString()[0]

  if (categoryCode in httpResponseCategoryCode) {
    return httpResponseCategoryCode[categoryCode as keyof typeof httpResponseCategoryCode]
  }

  return 'server_error'
})

//
//
//

export type TEHttpResponseCode = z.infer<typeof ZEHttpResponseCode>
export type TEHttpResponseCategory = z.infer<typeof ZEHttpResponseCategory>
