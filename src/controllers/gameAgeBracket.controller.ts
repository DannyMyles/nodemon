import { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../core/models/responseModel';
// import gameAgeService from '../services/gameGender.service';
import GameAgeService from '../services/gameAgeBracket.service';

const gameAgeService = new GameAgeService();

export default class GameController {
  public async createGameAgeBracket(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const gameAge = await gameAgeService.createGameAge(req.body, next);
      return res
        .status(200)
        .json({ data: gameAge, message: 'Age bracket created successfully' });
      // return res
      //   .status(201)
      //   .send(
      //     new ApiResponse(
      //       201,
      //       gameAge,
      //       'Game age created successfully!',
      //       false,
      //     ),
      //   );
    } catch (err) {
      return next(err);
    }
  }
  public async getAll(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    // console.log('Here I am , where are you?');
    try {
      const gameGenders = await gameAgeService.getAll(next);
      return res
        .status(200)
        .send(
          new ApiResponse(200, gameGenders, 'Got all game genders.', false),
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

      const data = await gameAgeService.update(id, req.body, next);
      return res
        .status(200)
        .json({ message: 'Game age updated successfully', data });
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

      const deletedGameGender = await gameAgeService.delete(id, next);
      return res
        .status(200)
        .send(
          new ApiResponse(
            200,
            deletedGameGender,
            'Game age deleted successfully',
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

      const gameGender = await gameAgeService.findById(id, next);

      if (!gameGender) {
        return res
          .status(404)
          .send(ApiResponse.generateNotFoundErrorResponse('gameAge'));
      }
      return res
        .status(200)
        .send(new ApiResponse(200, gameGender, 'Got age', false));
    } catch (err) {
      return next(err);
    }
  }
}
