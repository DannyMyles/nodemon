import { IGameGender } from '../../core/models/gameGenderModel';
import { sequelize } from '../connect-db';
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

class GameGender
  extends Model<
    InferAttributes<GameGender>,
    InferCreationAttributes<GameGender>
  >
  implements IGameGender
{
  gameID: string;
  gender: string;
}

GameGender.init(
  {
    gameID: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'game_genders',
    freezeTableName: true,
  },
);
export default GameGender;
