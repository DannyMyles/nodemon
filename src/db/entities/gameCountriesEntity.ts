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

class GameCountries
  extends Model<
    InferAttributes<GameCountries>,
    InferCreationAttributes<GameCountries>
  >
  implements IGameCountries
{
  gameID: string;
  locale: string;
}

GameCountries.init(
  {
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

// Sync the model with the database
// GameCountries.sync({ force: true })
//   .then(() => {
//     console.log('Table created successfully!');
//   })
//   .catch((error) => {
//     console.error('Error creating table:', error);
//   });
export default GameCountries;
