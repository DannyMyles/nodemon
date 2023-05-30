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
  roleId: string;
  role: ROLE_TYPES;
  count: number;
  createdAt: Date;
  updatedAt: Date;
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
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'roles',
    freezeTableName: true,
  },
);

export default Role;
