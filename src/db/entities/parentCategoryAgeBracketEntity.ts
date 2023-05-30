import { IParentCategoryAgeBracket } from '../../core/models/parentCategoryAgeBracketModel';
import { IParentCategoryCountries } from '../../core/models/parentCategoryCountriesModel';
import { sequelize } from '../connect-db';
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

class ParentCategoryAgeBracket
  extends Model<
    InferAttributes<ParentCategoryAgeBracket>,
    InferCreationAttributes<ParentCategoryAgeBracket>
  >
  implements IParentCategoryAgeBracket
{
  from_age: string;
  to_age: string;
  parentCategoryAgeBracketID: string;
}

ParentCategoryAgeBracket.init(
  {
    parentCategoryAgeBracketID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'parent_categories',
        key: 'parentCategoryID',
      },
      onDelete: 'cascade',
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
    modelName: 'parent_category_age_brackets',
    freezeTableName: true,
  },
);
export default ParentCategoryAgeBracket;
