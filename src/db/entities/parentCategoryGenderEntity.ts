import { IParentCategoryGender } from '../../core/models/parentCategoryGenderModel';
import { sequelize } from '../connect-db';
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

class ParentCategoryGender
  extends Model<
    InferAttributes<ParentCategoryGender>,
    InferCreationAttributes<ParentCategoryGender>
  >
  implements IParentCategoryGender
{
  gender: string;
  parentCategoryID: string;
}

ParentCategoryGender.init(
  {
    parentCategoryID: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'parent_categories',
        key: 'parentCategoryID',
      },
      onDelete: 'cascade',
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'parent_category_genders',
    freezeTableName: true,
  },
);
export default ParentCategoryGender;
