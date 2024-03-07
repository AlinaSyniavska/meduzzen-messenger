import { IUser } from './user.interface.ts';

export interface IAuth {
    user?: IUser;
    access_token: string;
    refresh_token: string;
}
