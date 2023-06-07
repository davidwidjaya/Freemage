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
  code: number
  status: "success" | "failed"
  message: string
  data: T
}

/**
 * API response shape when using pagination
 */
export interface ApiPaginationResponse<T = any[]> {
  current_page: number
  data: T
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: { url: string | null, label: string, active: boolean }[]
  next_page_url: string
  path: string
  per_page: string
  prev_page_url: string | null
  to: number
  total: number
}

/**
 * Processed API response shape
 */
export type ApiProcessedResponse<Tdata = any> = Promise<{ kind: "ok"; data: Tdata; message?: string } | GeneralApiProblem>

export interface ApiFeedResponse {
  status: string
  feed: {
    url: string
    title: string
    link: string
    author: string
    description: string
    image: string
  }
  items: EpisodeItem[]
}

/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */
export interface EpisodeItem {
  title: string
  pubDate: string
  link: string
  guid: string
  author: string
  thumbnail: string
  description: string
  content: string
  enclosure: {
    link: string
    type: string
    length: number
    duration: number
    rating: { scheme: string; value: string }
  }
  categories: string[]
}

/**
 * Get Products API request parameter
 */
export interface GetProductsRequestParams {
  src?: string
  type: "products"
  page: number
}