import Config from "@config"
import {
    ApiResponse,
    ApisauceInstance,
    create,
} from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, ApiGeneralResponse, ApiProcessedResponse } from "./api.types"

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
export class ApiBase {
    protected apisauce: ApisauceInstance
    protected config: ApiConfig

    constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
        this.config = config
        this.apisauce = create({
            baseURL: this.config.url,
            timeout: this.config.timeout,
            headers: {
                Accept: "application/json",
                Authorization: "Client-ID 3jv9nwGzzvb-pCB-lOeU3OTjxTHkTn-pWIcYeoka96U"
            },
            transformResponse: [data => data],
        })

        this.apisauce.axiosInstance.interceptors.response.use(response => {
            response.data = JSON.parse(response.data);
            return response;
        }, error => {
            return Promise.reject(error);
        });
    }

    /**
     * Process incoming response 
     */
    protected async processResponse<Tdata = any, Tdatafailed = any>(response: ApiResponse<ApiGeneralResponse<Tdata>>): ApiProcessedResponse<Tdata, Tdatafailed> {
        if (!response.ok) {
            const problem = getGeneralApiProblem<Tdatafailed>(response)
            if (problem) {
                return problem;
            }
        }

        // transform the data into the format we are expecting
        try {
            const rawData = response.data;
            return { kind: "ok", data: rawData.data, message: rawData.message }
        } catch (e) {
            if (__DEV__) {
                console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
            }
            return { kind: "bad-data", message: response?.data?.message || "" }
        }
    }
}