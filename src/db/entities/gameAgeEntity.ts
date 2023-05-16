import { IGameAge } from '../../core/models/gameAgeModel';
import { IGameGender } from '../../core/models/gameGenderModel';
import { sequelize } from '../connect-db';
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

class GameAge
  extends Model<InferAttributes<GameAge>, InferCreationAttributes<GameAge>>
  implements IGameAge
{
  from_age: string;
  to_age: string;
  gameID: string;
}

GameAge.init(
  {
    gameID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
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

// Sync the model with the database
// GameAge.sync({ force: true })
//   .then(() => {
//     console.log('Table created successfully!');
//   })
//   .catch((error) => {
//     console.error('Error creating table:', error);
//   });
export default GameAge;
