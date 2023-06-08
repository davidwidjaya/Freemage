import { ApiBase } from "../api-base";
import { ApiGeneralResponse } from "../api.types";
import { ApiFetchPhotoByIdRequest, ApiFetchPhotoByIdResponse, ApiFetchPhotosRequest, ApiFetchPhotosResponse, ApiSearchPhotosRequest, ApiSearchPhotosResponse } from "./photo.types";

export class ApiPhoto extends ApiBase {

    constructor() {
        super();
    }

    async fetchPhotos(param: ApiFetchPhotosRequest) {
        const response = await this.apisauce.get<ApiGeneralResponse<ApiFetchPhotosResponse[]>>(`/photos`, param);
        return this.processResponse<ApiFetchPhotosResponse[]>(response);
    }
    async fetchPhotosById(param: ApiFetchPhotoByIdRequest) {
        const response = await this.apisauce.get<ApiGeneralResponse<ApiFetchPhotoByIdResponse>>(`/photos${param.id}`);
        return this.processResponse<ApiFetchPhotoByIdResponse>(response);
    }
    async searchPhotos(param: ApiSearchPhotosRequest) {
        const response = await this.apisauce.get<ApiGeneralResponse<ApiSearchPhotosResponse>>(`/photos`, param);
        return this.processResponse<ApiSearchPhotosResponse>(response);
    }
}

export const apiPhoto = new ApiPhoto()
