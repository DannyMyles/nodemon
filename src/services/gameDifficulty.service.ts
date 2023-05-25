import GameDifficullty from '../db/entities/gameDifficultyEntity';
import { gameDifficultyModel } from '../core/models/gameDifficultyModel';
import { NextFunction } from 'express';

export default class GameDifficultyService {
  public async createGameDifficulty(
    data: Omit<gameDifficultyModel, 'difficultyID'>,
    next: NextFunction,
  ): Promise<GameDifficullty | void> {
    try {
      const newGameDifficulty = await GameDifficullty.create({
        difficultyDescription: data.difficultyDescription,
      });
      // console.log('New Game Difficulty', newGameDifficulty);
      return this.findGameDifficultyByDescription(
        newGameDifficulty.difficultyDescription,
        next,
      );
    } catch (err) {
      return next(err);
    }
  }

  public async findGameDifficultyByDescription(
    difficultyDescription: string,
    next: NextFunction,
  ): Promise<GameDifficullty | void> {
    try {
      return GameDifficullty.findOne({
        where: { difficultyDescription },
      });
    } catch (err) {
      return next(err);
    }
  }

  public async update(
    difficultyID: string,
    data: Partial<gameDifficultyModel>,
    next: NextFunction,
  ): Promise<GameDifficullty | void> {
    try {
      await GameDifficullty.update({ ...data }, { where: { difficultyID } });
      return GameDifficullty.findByPk(difficultyID);
    } catch (err) {
      return next(err);
    }
  }

  public async getAll(next: NextFunction): Promise<GameDifficullty[] | void> {
    try {
      return GameDifficullty.findAll({});
    } catch (err) {
      return next(err);
    }
  }

  public async findById(
    difficultyID: string,
    next: NextFunction,
  ): Promise<GameDifficullty | void> {
    try {
      return GameDifficullty.findByPk(difficultyID);
    } catch (err) {
      return next(err);
    }
  }

  public async delete(
    difficultyID: string,
    next: NextFunction,
  ): Promise<GameDifficullty | void> {
    try {
      const game = await GameDifficullty.findByPk(difficultyID);
      await GameDifficullty.destroy({
        where: {
          difficultyID,
        },
      });
      return game;
    } catch (err) {
      return next(err);
    }
  }
}
