import { GeneralApiProblem } from "./api-problem"

/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}

/**
 * General API response shape
 */
export interface ApiGeneralResponse<T = any> {
  errors?: string[]
}

/**
 * API response shape when using pagination
 */
export interface ApiPaginationResponse<T = any[]> {
  total: number
  total_pages: number
  results: T
}

/**
 * Processed API response shape
 */

export type ApiProcessedResponse<Tdata = any, Tdatafailed = any> = Promise<{ kind: "ok"; data: ApiGeneralResponse<Tdata>; message?: string[] } | GeneralApiProblem<Tdatafailed>>
