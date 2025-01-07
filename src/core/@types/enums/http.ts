import {
  HTTP_METHODS,
  HTTP_RESPONSE_CATEGORIES,
  HTTP_RESPONSE_CLIENT_ERROR_CODE,
  HTTP_RESPONSE_CODE,
  HTTP_RESPONSE_INFORMATION_CODE,
  HTTP_RESPONSE_REDIRECTION_CODE,
  HTTP_RESPONSE_SERVER_ERROR_CODE,
  HTTP_RESPONSE_SUCCESS_CODE,
} from '_COR/constants/http'
import { httpResponseCategoryCode } from '_COR/constants/parse/http'
import z from 'zod'

export const ZEHttpMethods = z.enum(HTTP_METHODS)

export const ZEHttpResponseInformationCode = z.enum(HTTP_RESPONSE_INFORMATION_CODE)
export const ZEHttpResponseSuccessCode = z.enum(HTTP_RESPONSE_SUCCESS_CODE)
export const ZEHttpResponseRedirectionCode = z.enum(HTTP_RESPONSE_REDIRECTION_CODE)
export const ZEHttpResponseClientErrorCode = z.enum(HTTP_RESPONSE_CLIENT_ERROR_CODE)
export const ZEHttpResponseEerverErrorCode = z.enum(HTTP_RESPONSE_SERVER_ERROR_CODE)

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

export type TEHttpMethods = z.infer<typeof ZEHttpMethods>

export type TEHttpResponseInformationCode = z.infer<typeof ZEHttpResponseInformationCode>
export type TEHttpResponseSuccessCode = z.infer<typeof ZEHttpResponseSuccessCode>
export type TEHttpResponseRedirectionCode = z.infer<typeof ZEHttpResponseRedirectionCode>
export type TEHttpResponseClientErrorCode = z.infer<typeof ZEHttpResponseClientErrorCode>
export type TEHttpResponseEerverErrorCode = z.infer<typeof ZEHttpResponseEerverErrorCode>

export type TEHttpResponseCode = z.infer<typeof ZEHttpResponseCode>
export type TEHttpResponseCategory = z.infer<typeof ZEHttpResponseCategory>
