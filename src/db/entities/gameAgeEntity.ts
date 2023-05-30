import { IGameAge } from '../../core/models/gameAgeModel';
import { sequelize } from '../connect-db';
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import GameImage from './gameImageEntity';

class GameAge
  extends Model<InferAttributes<GameAge>, InferCreationAttributes<GameAge>>
  implements IGameAge
{
  age_bracketID: string;
  from_age: string;
  to_age: string;
  gameID: string;
}

GameAge.init(
  {
    age_bracketID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    gameID: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    from_age: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    to_age: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'game_ages',
    freezeTableName: true,
  },
);

GameImage.hasMany(GameAge, {
  foreignKey: 'gameID',
});
GameAge.belongsTo(GameImage, {
  foreignKey: 'gameID',
});
export default GameAge;
