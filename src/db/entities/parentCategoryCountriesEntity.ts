import { IParentCategoryCountries } from '../../core/models/parentCategoryCountriesModel';
import { sequelize } from '../connect-db';
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

class ParentCategoryCountries
  extends Model<
    InferAttributes<ParentCategoryCountries>,
    InferCreationAttributes<ParentCategoryCountries>
  >
  implements IParentCategoryCountries
{
  locale: string;
  parentCategoryID: string;
}

ParentCategoryCountries.init(
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
    locale: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'parent_category_countries',
    freezeTableName: true,
  },
);
export default ParentCategoryCountries;
