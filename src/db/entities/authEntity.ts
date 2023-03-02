import { sequelize } from '../connect-db';
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { IAuthSession } from '../../core/models/authModel';
import User from './userEntity';

class AuthSession
  extends Model<
    InferAttributes<AuthSession>,
    InferCreationAttributes<AuthSession>
  >
  implements IAuthSession
{
  authId: number;
  userId: number;
  loginTime: Date;
  logoutTime: Date;
}

AuthSession.init(
  {
    authId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    loginTime: {
      type: DataTypes.DATE,
    },
    logoutTime: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: 'auth',
    freezeTableName: true,
  },
);

AuthSession.belongsTo(User, {
  foreignKey: 'userId',
});
User.hasMany(AuthSession);

export default AuthSession;
