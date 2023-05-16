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
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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

// Sync the model with the database
// GameGender.sync({ force: true })
//   .then(() => {
//     console.log('Table created successfully!');
//   })
//   .catch((error) => {
//     console.error('Error creating table:', error);
//   });
export default GameGender;
