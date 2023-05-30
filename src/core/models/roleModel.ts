import { ROLE_TYPES } from '../../utils/constants';

export interface IRole {
  roleId: string;
  role: ROLE_TYPES;
  count: number;
  createdAt: Date;
  updatedAt: Date;
}

export class RoleModel implements IRole {
  constructor(
    public roleId: string = '',
    public role: ROLE_TYPES = ROLE_TYPES.USER,
    public count: number = 0,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}
