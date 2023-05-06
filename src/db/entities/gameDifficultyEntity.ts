import { IGameDifficulty } from '../../core/models/gameDifficultyModel';
import { IParentCategoryGender } from '../../core/models/parentCategoryGenderModel';
import { sequelize } from '../connect-db';
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

class GameDifficulty
  extends Model<
    InferAttributes<GameDifficulty>,
    InferCreationAttributes<GameDifficulty>
  >
  implements IGameDifficulty
{
  difficultyID: string;
  difficultyDescription: string;

  static associate(models: any) {
    GameDifficulty.hasMany(models.GameImageModel, {
      foreignKey: 'difficultyID',
    });
  }
}

GameDifficulty.init(
  {
    difficultyID: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    difficultyDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'game_difficulties',
    freezeTableName: true,
  },
);
export default GameDifficulty;
