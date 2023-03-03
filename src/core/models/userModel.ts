import { GENDER_TYPES, ROLE_TYPES } from '../../utils/constants';

export interface IUser {
  id: number;
  fullname: string;
  lastname: string;
  email: string;
  birthdate: string;
  gender: GENDER_TYPES;
  username: string;
  password: string;
  roleId: number;
  role?: ROLE_TYPES;
}

export class UserModel implements IUser {
  constructor(
    public id: number = 0,
    public fullname: string = '',
    public lastname: string = '',
    public email: string = '',
    public birthdate: string = '',
    public gender: GENDER_TYPES = GENDER_TYPES.MALE,
    public username: string = '',
    public password: string = '',
    public accessToken: string = '',
    public roleId: number = 0,
    public role?: ROLE_TYPES,
  ) {}
}
