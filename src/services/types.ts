export type ApiResponseShape<T, U extends ResponseType = ResponseType.API_SUCCESS> = {
    data: T;
    responseType: U;
};

export enum ResponseType {
    API_SUCCESS = 'API_SUCCESS',
    API_ERROR = 'API_ERROR',
}

export type GenericError = { title: string; message: string };
export type GenericErrorResponse = ApiResponseShape<GenericError, ResponseType.API_ERROR>;
