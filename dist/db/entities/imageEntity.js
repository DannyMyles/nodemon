// import { sequelize } from '../connect-db';
// import {
//   DataTypes,
//   InferAttributes,
//   InferCreationAttributes,
//   Model,
// } from 'sequelize';
// import { IGameImageModel } from '../../core/models/gameImageModel';
// import User from './userEntity';
// class Image
//   extends Model<InferAttributes<Image>, InferCreationAttributes<Image>>
//   implements IGameImageModel
// {
//   gameID: string;
//   image: string;
//   status: boolean;
//   prize: number;
//   difficulty: string;
//   dateAdded: Date;
//   dateUpdated: Date;
//   updatedBy: number;
//   parentCategoryID: string;
//   paidAmount: number;
// }
// Image.init(
//   {
//     gameID: {
//       type: DataTypes.UUIDV4,
//       allowNull: false,
//     },
//     image: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     status: {
//       type: DataTypes.BOOLEAN,
//     },
//     prize: {
//       type: DataTypes.INTEGER,
//     },
//     difficulty: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     dateAdded: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     dateUpdated: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     updatedBy: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     parentCategoryID: {
//       type: DataTypes.STRING,
//       // allowNull: false,
//     },
//     paidAmount: {
//       type: DataTypes.INTEGER,
//     },
//   },
//   {
//     sequelize,
//     modelName: 'images',
//     freezeTableName: true,
//   },
// );
// // Image.belongsTo(User);
// // User.hasMany(Image);
// export default Image;
//# sourceMappingURL=imageEntity.js.map