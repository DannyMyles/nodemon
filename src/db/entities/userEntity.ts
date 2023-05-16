import { sequelize } from '../connect-db';
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import * as crypto from 'crypto';
import { IUser } from '../../core/models/userModel';
import { GENDER_TYPES } from '../../utils/constants';
import Role from './roleEntity';

class User
  extends Model<InferAttributes<User>, InferCreationAttributes<User>>
  implements Omit<IUser, 'roleId'>
{
  id: number;
  fullname: string;
  lastname: string;
  email: string;
  birthdate: string;
  gender: GENDER_TYPES;
  username: string;
  password: string;
  roleId?: number;
  validatePassword: (pass: string) => boolean;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    birthdate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM('male', 'female'),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      set(pass: string): void {
        const hash = crypto
          .pbkdf2Sync(pass, process.env.SALT, 1000, 64, 'sha512')
          .toString('hex');
        this.setDataValue('password', hash);
      },
    },
  },
  {
    sequelize,
    modelName: 'users',
    freezeTableName: true,
  },
);

Role.hasMany(User, {
  foreignKey: 'roleId',
});
User.belongsTo(Role, {
  foreignKey: 'roleId',
});

User.prototype.validatePassword = function (enteredPassword: string): boolean {
  const newHash = crypto
    .pbkdf2Sync(enteredPassword, process.env.SALT, 1000, 64, 'sha512')
    .toString('hex');
  return newHash === this.password;
};

export default User;
