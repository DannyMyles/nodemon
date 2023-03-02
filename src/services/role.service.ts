import Role from '../db/entities/roleEntity';
import { RoleModel } from '../core/models/roleModel';
import { ROLE_TYPES } from '../utils/constants';

export default class RoleService {
    public async createRole(
        data: Omit<RoleModel, 'roleId'>,
    ): Promise<Role | void> {
        try {
            return Role.create({
                role: data.role,
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    public async getAll(): Promise<Role[] | void> {
        try {
            return Role.findAll();
        } catch (err) {
            throw new Error(err);
        }
    }

    public async getRoleById(roleId: number): Promise<Role | void> {
        try {
            return Role.findByPk(roleId);
        } catch (err) {
            throw new Error(err);
        }
    }

    // Getting role by role
    public async getOneRole(role: ROLE_TYPES): Promise<Role | void> {
        try {
            return Role.findOne({
                where: { role },
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    // If returns 0 then nothing is updated, else returns 1.
    public async updateRoleCount(role: ROLE_TYPES): Promise<number | void> {
        try {
            const currRole = await this.getOneRole(role);
            if (currRole) {
                const updatedCount = await Role.update(
                    {
                        count: currRole.count + 1,
                    },
                    {
                        where: {
                            role: role,
                        },
                    },
                );
                return updatedCount[0];
            }
        } catch (err) {
            throw new Error(err);
        }
    }
}
