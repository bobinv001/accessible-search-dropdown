import { IManager } from '../../services/managers/types';

export type IManagersState = {
    list: IManager[];
    status: FetchStatus;
};

export enum FetchStatus {
    NOT_LOADED,
    SUCCESS,
    ERROR,
}
