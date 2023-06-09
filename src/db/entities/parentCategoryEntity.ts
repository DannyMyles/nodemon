import { IParentCategory } from '../../core/models/parentCategoryModel';
import { sequelize } from '../connect-db';
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

class ParentCategory
  extends Model<
    InferAttributes<ParentCategory>,
    InferCreationAttributes<ParentCategory>
  >
  implements IParentCategory
{
  parentCategoryID: string;
  categoryName: string;
  enabled: boolean;
  image: string;
}

ParentCategory.init(
  {
    parentCategoryID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'parent_categories',
    freezeTableName: true,
  },
);

// Sync the model with the database
// ParentCategory.sync({ force: true })
//   .then(() => {
//     console.log('Table created successfully!');
//   })
//   .catch((error) => {
//     console.error('Error creating table:', error);
//   });
export default ParentCategory;
