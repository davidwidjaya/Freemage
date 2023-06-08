import { ApiResponse } from "apisauce";
import { ApiGeneralResponse } from "./api.types";

type ApiProblem<Tdatafailed> =
  /**
   * Times up.
   */
  | { kind: "timeout"; temporary: true }
  /**
   * Cannot connect to the server for some reason.
   */
  | { kind: "cannot-connect"; temporary: true }
  /**
   * The server experienced a problem. Any 5xx error.
   */
  | { kind: "server" }
  /**
   * We're not allowed because we haven't identified ourself. This is 401.
   */
  | { kind: "unauthorized" }
  /**
   * We don't have access to perform that request. This is 403.
   */
  | { kind: "forbidden" }
  /**
   * Unable to find that resource.  This is a 404.
   */
  | { kind: "not-found" }
  /**
   * All other 4xx series errors.
   */
  | { kind: "rejected" }
  /**
   * Something truly unexpected happened. Most likely can try again. This is a catch all.
   */
  | { kind: "unknown"; temporary: true }
  /**
   * The data we received is not in the expected format.
   */
  | { kind: "bad-data" }

export type GeneralApiProblem<Tdatafailed> = ApiProblem<Tdatafailed> & { message?: string[], data?: Tdatafailed }

/**
 * Attempts to get a common cause of problems from an api response.
 *
 * @param response The api response.
 */
export function getGeneralApiProblem<Tdatafailed>(response: ApiResponse<ApiGeneralResponse>): GeneralApiProblem<Tdatafailed> | void {
  let data: any = null;
  if (!!response.data) {
    try {
      data = response.data;
      if (!!data) {
        data = JSON.parse(data as unknown as string);
      }
    } catch (error) {

    }
  }

  switch (response.problem) {
    case "CONNECTION_ERROR":
      return { kind: "cannot-connect", temporary: true, message: [] }
    case "NETWORK_ERROR":
      return { kind: "cannot-connect", temporary: true, message: [] }
    case "TIMEOUT_ERROR":
      return { kind: "timeout", temporary: true, message: [] }
    case "SERVER_ERROR":
      return { kind: "server", message: [] }
    case "UNKNOWN_ERROR":
      return { kind: "unknown", temporary: true, message: [] }
    case "CLIENT_ERROR":
      const { data } = response;
      switch (response.status) {
        case 401:
          return { kind: "unauthorized", message: data.errors }
        case 403:
          return { kind: "forbidden", message: data.errors }
        case 404:
          return { kind: "not-found", message: data.errors }
        default:
          return { kind: "rejected", message: data.errors }
      }
    case "CANCEL_ERROR":
      return null
  }

}
