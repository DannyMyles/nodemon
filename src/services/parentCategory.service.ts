// import GameDifficullty from '../db/entities/gameDifficultyEntity';
import ParentCategory from '../db/entities/parentCategoryEntity';
import { parentCategoryModel } from '../core/models/parentCategoryModel';
import { NextFunction } from 'express';
import multer from 'multer';

export default class ParentCategoryService {
  public async createParentCategory(
    // data: { categoryName: string; enabled: boolean },
    data: any,
    image: multer.Multer,
    next: NextFunction,
  ): Promise<ParentCategory | void> {
    // console.log('Image', image);
    // console.log('Data', data);
    try {
      const newParentCategory = await ParentCategory.create({
        categoryName: data.categoryName,
        image: image.originalname,
        enabled: data.enabled,
      });
      //   console.log('Blah', newParentCategory);
      return this.findByCategoryName(newParentCategory.categoryName, next);
    } catch (err) {
      return next(err);
    }
  }

  public async findByCategoryName(
    categoryName: string,
    next: NextFunction,
  ): Promise<ParentCategory | void> {
    try {
      return ParentCategory.findOne({
        where: { categoryName },
      });
    } catch (err) {
      return next(err);
    }
  }

  public async update(
    parentCategoryID: string,
    data: Partial<parentCategoryModel>,
    next: NextFunction,
  ): Promise<ParentCategory | void> {
    try {
      await ParentCategory.update({ ...data }, { where: { parentCategoryID } });
      return ParentCategory.findByPk(parentCategoryID);
    } catch (err) {
      return next(err);
    }
  }

  public async getAll(next: NextFunction): Promise<ParentCategory[] | void> {
    try {
      return ParentCategory.findAll({});
    } catch (err) {
      return next(err);
    }
  }

  public async findById(
    parentCategoryID: string,
    next: NextFunction,
  ): Promise<ParentCategory | void> {
    try {
      return ParentCategory.findByPk(parentCategoryID);
    } catch (err) {
      return next(err);
    }
  }

  public async delete(
    parentCategoryID: string,
    next: NextFunction,
  ): Promise<ParentCategory | void> {
    try {
      const parentCategory = await ParentCategory.findByPk(parentCategoryID);
      await ParentCategory.destroy({
        where: {
          parentCategoryID,
        },
      });
      return parentCategory;
    } catch (err) {
      return next(err);
    }
  }
}
