import { IState } from '../types';
import { IManagersState } from './types';

export const getManagers = (state: IState): IManagersState => state.managers;
