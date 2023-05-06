import { IGameImageModel } from '../../core/models/gameImageModel';
import { parentCategoryModel } from '../../core/models/parentCategoryModel';
import { sequelize } from '../connect-db';
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import ParentCategory from './parentCategoryEntity';

class GameImage
  extends Model<InferAttributes<GameImage>, InferCreationAttributes<GameImage>>
  implements IGameImageModel
{
  gameID: string;
  image: string;
  difficultyID: string;
  //   createdAt: Date;
  //   updatedAt: Date;
  updatedBy: number;
  parentCategoryID: string;
  paidAmount: number;
  status: boolean;
  prize: number;

  static associate(models: any) {
    GameImage.belongsTo(models.GameDifficulty, { foreignKey: 'difficultyID' });
  }
}

GameImage.init(
  {
    gameID: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficultyID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // createdAt: {
    //   type: DataTypes.DATE,
    // },
    // updatedAt: {
    //   type: DataTypes.DATE,
    // },
    updatedBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parentCategoryID: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'parent_categories',
        key: 'parentCategoryID',
      },
    },
    paidAmount: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
    prize: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: 'game_images',
    freezeTableName: true,
    timestamps: true,
    // paranoid: true,
  },
);

GameImage.belongsTo(ParentCategory, {
  foreignKey: 'parentCategoryID',
  as: 'parentCategory',
});

export default GameImage;
