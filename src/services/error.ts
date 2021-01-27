import { ResponseType, GenericErrorResponse } from './types';

const ErrorFactory = (title: string, message: string): GenericErrorResponse => {
    return {
        data: {
            title,
            message,
        },
        responseType: ResponseType.API_ERROR,
    };
};

// just a generic handler for now, extend to include specific api based scenarios
export const handleError = (error?: { response?: { status?: number } }): ReturnType<typeof ErrorFactory> => {
    switch (error?.response?.status) {
        case 404: {
            return ErrorFactory('404', 'Not found');
        }
        default: {
            return ErrorFactory('Error', 'Please try again');
        }
    }
};
