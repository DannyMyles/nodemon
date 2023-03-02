import { ROLE_TYPES } from '../../utils/constants';

export interface IRole {
    roleId: number;
    role: ROLE_TYPES;
    count: number;
}

export class RoleModel implements IRole {
    constructor(
        public roleId: number = 0,
        public role: ROLE_TYPES = ROLE_TYPES.USER,
        public count: number = 0,
    ) {}
}
