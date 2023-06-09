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
  parentCategoryCountriesID: string;
}

ParentCategoryCountries.init(
  {
    parentCategoryCountriesID: {
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
// Sync the model with the database
// ParentCategoryCountries.sync({ force: true })
//   .then(() => {
//     console.log('Table created successfully!');
//   })
//   .catch((error) => {
//     console.error('Error creating table:', error);
//   });

export default ParentCategoryCountries;
