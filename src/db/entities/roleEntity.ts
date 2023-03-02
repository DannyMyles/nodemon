import { sequelize } from '../connect-db';
import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';
import { IRole } from '../../core/models/roleModel';
import { ROLE_TYPES } from '../../utils/constants';

class Role
    extends Model<InferAttributes<Role>, InferCreationAttributes<Role>>
    implements IRole
{
    roleId: number;
    role: ROLE_TYPES;
    count: number;
}

Role.init(
    {
        roleId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        count: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'role',
        freezeTableName: true,
    },
);

export default Role;
