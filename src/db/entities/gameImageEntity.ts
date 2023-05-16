import { IGameImageModel } from '../../core/models/gameImageModel';
import { sequelize } from '../connect-db';
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import ParentCategory from './parentCategoryEntity';
import GameDifficulty from './gameDifficultyEntity';
import { GAME_STATUSES } from '../../utils/constants';

class GameImage
  extends Model<InferAttributes<GameImage>, InferCreationAttributes<GameImage>>
  implements IGameImageModel
{
  gameID: string;
  image: string;
  difficultyID: string;
  createdAt: Date;
  updatedAt: Date;
  updatedBy: number;
  parentCategoryID: string;
  paidAmount: number;
  status: GAME_STATUSES;
  prize: number;
}

GameImage.init(
  {
    gameID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficultyID: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    updatedBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parentCategoryID: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    paidAmount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('accepted', 'rejected'),
      allowNull: true,
    },
    prize: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'game_images',
    freezeTableName: true,
  },
);

GameDifficulty.hasMany(GameImage, {
  foreignKey: 'difficultyID',
});
GameImage.belongsTo(GameDifficulty, {
  foreignKey: 'difficultyID',
});
ParentCategory.hasMany(GameImage, {
  foreignKey: 'parentCategoryID',
});
GameImage.belongsTo(ParentCategory, {
  foreignKey: 'parentCategoryID',
});

export default GameImage;
