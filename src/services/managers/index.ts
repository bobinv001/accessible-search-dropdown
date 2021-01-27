import { handleError } from '../error';
import { ResponseType } from '../types';
import { getInitialsFromName } from '../utils';
import { IManager, IRawManager } from './types';

export const API = 'https://random-data-api.com/api/users/random_user?size=10';

export const getManagersList = async () => {
    try {
        const response = await fetch(API);
        const rawData = await response.json();
        return {
            data: parseManagers(rawData),
            responseType: ResponseType.API_SUCCESS,
        };
    } catch (error) {
        return handleError(error);
    }
};

export const parseManagers = (data: IRawManager[]): IManager[] => {
    return data.map(({ id, first_name, last_name, email = '' }) => {
        return {
            id,
            initials: getInitialsFromName(`${first_name} ${last_name}`),
            firstName: first_name,
            lastName: last_name,
            name: `${first_name} ${last_name}`,
            email: email,
        };
    });
};
