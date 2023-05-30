import { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../core/models/responseModel';
import GameGenderService from '../services/gameGender.service';

const gameGenderService = new GameGenderService();

export default class GameController {
  public async createGameDifficulty(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const gameDifficulty = await gameGenderService.createGameGender(
        req.body,
        next,
      );
      return res
        .status(201)
        .send(
          new ApiResponse(
            201,
            gameDifficulty,
            'Game gender created successfully!',
            false,
          ),
        );
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
      const gameGenders = await gameGenderService.getAll(next);
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

      const data = await gameGenderService.update(id, req.body, next);
      return res
        .status(200)
        .json({ message: 'Game gender updated successfully', data });
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

      const deletedGameGender = await gameGenderService.delete(id, next);
      return res
        .status(200)
        .send(
          new ApiResponse(
            200,
            deletedGameGender,
            'Game gender deleted successfully',
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

      const gameGender = await gameGenderService.findById(id, next);

      if (!gameGender) {
        return res
          .status(404)
          .send(ApiResponse.generateNotFoundErrorResponse('gameGender'));
      }
      return res
        .status(200)
        .send(new ApiResponse(200, gameGender, 'Got gender', false));
    } catch (err) {
      return next(err);
    }
  }
}
