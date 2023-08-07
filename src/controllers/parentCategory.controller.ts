import { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../core/models/responseModel';
import ParentCategoryService from '../services/parentCategory.service';

const parentCategoryService = new ParentCategoryService();

export default class ParentCategoryController {
  public async createParentCategory(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      // const { categoryName, enabled } = req.params;
      // console.log('Params', req.params);
      const parentCategory = await parentCategoryService.createParentCategory(
        req.params,
        req['file'],
        next,
      );
      if (parentCategory) {
        return res
          .status(201)
          .send(
            new ApiResponse(
              201,
              parentCategory,
              'Parent Category created successfully!',
              false,
            ),
          );
      }
    } catch (err) {
      return next(err);
    }
  }
  public async getAll(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const parentCategory = await parentCategoryService.getAll(next);
      return res
        .status(200)
        .send(
          new ApiResponse(
            200,
            parentCategory,
            'Got all parent categories.',
            false,
          ),
        );
      //   }
    } catch (err) {
      return next(err);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const id = req.params.id;
      if (!id) {
        return res
          .status(400)
          .send(ApiResponse.generateBadRequestErrorResponse());
      }

      const data = await parentCategoryService.update(id, req.body, next);
      return res
        .status(200)
        .send({ message: 'Parent category updated successfully' });
    } catch (err) {
      return next(err);
    }
  }

  public async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const id = req.params.id;

      if (!id) {
        return res
          .status(400)
          .send(ApiResponse.generateBadRequestErrorResponse());
      }

      const deletedGameDifficulty = await parentCategoryService.delete(
        id,
        next,
      );
      return res
        .status(200)
        .send(
          new ApiResponse(
            200,
            deletedGameDifficulty,
            'Parent category deleted successfully',
            false,
          ),
        );
    } catch (err) {
      return next(err);
    }
  }

  public async get(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const id = req.params.id;

      if (!id) {
        return res
          .status(400)
          .send(ApiResponse.generateBadRequestErrorResponse());
      }

      const parentCategory = await parentCategoryService.findById(id, next);

      if (!parentCategory) {
        return res
          .status(404)
          .send(ApiResponse.generateNotFoundErrorResponse('parentCategory'));
      }
      return res
        .status(200)
        .send(
          new ApiResponse(
            200,
            parentCategory,
            'Got parent category successfully',
            false,
          ),
        );
    } catch (err) {
      return next(err);
    }
  }
}
