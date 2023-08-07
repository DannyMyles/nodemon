import GameAge from '../db/entities/gameAgeEntity';
import { gameAgeModel } from '../core/models/gameAgeModel';

import { NextFunction } from 'express';

export default class GameAgeService {
  public async createGameAge(
    data: Omit<gameAgeModel, 'age_bracketID'>,
    next: NextFunction,
  ) {
    console.log('Data', data);
    try {
      const existingGameAge = await GameAge.findOne({
        where: { gameID: data.gameID },
      });
      console.log('Existing', existingGameAge);
      if (existingGameAge) {
        return 'Age bracket already exist for this game';
      }
      const newGameAge = await GameAge.create({
        gameID: data.gameID,
        from_age: data.from_age,
        to_age: data.to_age,
      });
      return this.findById(newGameAge.age_bracketID, next);
    } catch (err) {
      return next(err);
    }
  }

  public async update(
    age_bracketID: string,
    data: Partial<gameAgeModel>,
    next: NextFunction,
  ): Promise<GameAge | void> {
    try {
      await GameAge.update({ ...data }, { where: { age_bracketID } });
      return GameAge.findByPk(age_bracketID);
    } catch (err) {
      return next(err);
    }
  }

  public async getAll(next: NextFunction): Promise<GameAge[] | void> {
    try {
      return GameAge.findAll({});
    } catch (err) {
      return next(err);
    }
  }

  public async findById(
    age_bracketID: string,
    next: NextFunction,
  ): Promise<GameAge | void> {
    try {
      return GameAge.findByPk(age_bracketID);
    } catch (err) {
      return next(err);
    }
  }

  public async delete(
    age_bracketID: string,
    next: NextFunction,
  ): Promise<GameAge | void> {
    try {
      const game = await GameAge.findByPk(age_bracketID);
      await GameAge.destroy({
        where: {
          age_bracketID,
        },
      });
      return game;
    } catch (err) {
      return next(err);
    }
  }
}
