import { IGameDifficulty } from '../../core/models/gameDifficultyModel';
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
}

GameDifficulty.init(
  {
    difficultyID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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

// Sync the model with the database
// GameDifficulty.sync({ force: true })
//   .then(() => {
//     console.log('Table created successfully!');
//   })
//   .catch((error) => {
//     console.error('Error creating table:', error);
//   });
export default GameDifficulty;
