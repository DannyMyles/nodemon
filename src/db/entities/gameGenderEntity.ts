import { IGameGender } from '../../core/models/gameGenderModel';
import { sequelize } from '../connect-db';
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import GameImage from './gameImageEntity';

class GameGender
  extends Model<
    InferAttributes<GameGender>,
    InferCreationAttributes<GameGender>
  >
  implements IGameGender
{
  genderID: string;
  gameID: string;
  gender: string;
}

GameGender.init(
  {
    genderID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    gameID: {
      type: DataTypes.UUID,
      allowNull: false,
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

GameImage.hasMany(GameGender, {
  foreignKey: 'gameID',
});
GameGender.belongsTo(GameImage, {
  foreignKey: 'gameID',
});

// Sync the model with the database
// GameGender.sync({ force: true })
//   .then(() => {
//     console.log('Table created successfully!');
//   })
//   .catch((error) => {
//     console.error('Error creating table:', error);
//   });
export default GameGender;
