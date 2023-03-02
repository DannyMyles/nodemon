import { ROLE_TYPES } from '../../utils/constants';

export interface IToken {
  userId: number;
  email: string;
  role: ROLE_TYPES;
  token?: string;
  iat: number;
  exp: number;
}
