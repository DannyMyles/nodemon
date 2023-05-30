import { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../core/models/responseModel';
import GameDifficultyService from '../services/gameDifficulty.service';

const gameDifficultyService = new GameDifficultyService();

export default class GameController {
  public async createGameDifficulty(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const gameDifficulty = await gameDifficultyService.createGameDifficulty(
        req.body,
        next,
      );
      return res
        .status(201)
        .send(
          new ApiResponse(
            201,
            gameDifficulty,
            'Game difficulty created successfully!',
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
      const gameDifficulties = await gameDifficultyService.getAll(next);
      console.log('Response', gameDifficulties);
      return res
        .status(200)
        .send(
          new ApiResponse(
            200,
            gameDifficulties,
            'Got all game difficulty levels.',
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

      const data = await gameDifficultyService.update(id, req.body, next);
      return res
        .status(200)
        .json({ message: 'Game difficulty updated successfully', data });
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

      const deletedGameDifficulty = await gameDifficultyService.delete(
        id,
        next,
      );
      return res
        .status(200)
        .send(
          new ApiResponse(
            200,
            deletedGameDifficulty,
            'Game difficulty deleted successfully',
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

      const gameDifficulty = await gameDifficultyService.findById(id, next);

      if (!gameDifficulty) {
        return res
          .status(404)
          .send(ApiResponse.generateNotFoundErrorResponse('gameDifficulty'));
      }
      return res
        .status(200)
        .send(
          new ApiResponse(200, gameDifficulty, 'Got difficulty level', false),
        );
    } catch (err) {
      return next(err);
    }
  }
}
