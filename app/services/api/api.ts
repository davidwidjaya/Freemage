/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https:
 * documentation for more details.
 */
import Config from "../../config";
import { ApiBase } from "./api-base";
import type {
  ApiConfig
} from "./api.types";
import { apiPhoto } from "./module/photo";

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api extends ApiBase { }

export const api = {
  photo: apiPhoto
}