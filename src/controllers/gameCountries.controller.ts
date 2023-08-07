import { NextFunction, Request, Response } from 'express';
import { ApiResponse } from '../core/models/responseModel';
import GameCountryService from '../services/gameCountries.service';

const gameCountryService = new GameCountryService();

export default class GameController {
  public async createGameCountry(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const gameCountry = await gameCountryService.createGameCountry(
        req.body,
        next,
      );
      return res.status(200).json({
        data: gameCountry,
        message: 'Country created successfully',
      });
      // return res
      //   .status(201)
      //   .send(
      //     new ApiResponse(
      //       201,
      //       gameCountry,
      //       'Game locale created successfully!',
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
      const gameGenders = await gameCountryService.getAll(next);
      return res
        .status(200)
        .send(
          new ApiResponse(200, gameGenders, 'Got all game locales.', false),
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

      const data = await gameCountryService.update(id, req.body, next);
      return res
        .status(200)
        .json({ message: 'Game locale updated successfully', data });
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

      const deletedGameCountry = await gameCountryService.delete(id, next);
      return res
        .status(200)
        .send(
          new ApiResponse(
            200,
            deletedGameCountry,
            'Game locale deleted successfully',
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

      const gameCountry = await gameCountryService.findById(id, next);

      if (!gameCountry) {
        return res
          .status(404)
          .send(ApiResponse.generateNotFoundErrorResponse('gameCountry'));
      }
      return res
        .status(200)
        .send(new ApiResponse(200, gameCountry, 'Got gender', false));
    } catch (err) {
      return next(err);
    }
  }
}
