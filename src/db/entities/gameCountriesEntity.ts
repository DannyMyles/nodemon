import { IGameCountries } from '../../core/models/gameCountriesModel';
import { IGameDifficulty } from '../../core/models/gameDifficultyModel';
import { IParentCategoryGender } from '../../core/models/parentCategoryGenderModel';
import { sequelize } from '../connect-db';
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import GameImage from './gameImageEntity';

class GameCountries
  extends Model<
    InferAttributes<GameCountries>,
    InferCreationAttributes<GameCountries>
  >
  implements IGameCountries
{
  countryID: string;
  gameID: string;
  locale: string;
}

GameCountries.init(
  {
    countryID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    gameID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    locale: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'game_countries',
    freezeTableName: true,
  },
);

GameImage.hasMany(GameCountries, {
  foreignKey: 'gameID',
});
GameCountries.belongsTo(GameImage, {
  foreignKey: 'gameID',
});
export default GameCountries;
