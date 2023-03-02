import { sequelize } from '../connect-db';
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { IImage } from '../../core/models/imageModel';
import User from './userEntity';

class Image
  extends Model<InferAttributes<Image>, InferCreationAttributes<Image>>
  implements IImage
{
  type: string;
  name: string;
}

Image.init(
  {
    type: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'image',
    freezeTableName: true,
  },
);

Image.belongsTo(User);
User.hasMany(Image);

export default Image;
