import GameCountry from '../db/entities/gameCountriesEntity';
import { gameCountriesModel } from '../core/models/gameCountriesModel';

import { NextFunction } from 'express';

export default class GameCountryService {
  public async createGameCountry(
    data: Omit<gameCountriesModel, 'genderID'>,
    next: NextFunction,
  ): Promise<GameCountry | void> {
    try {
      const newGameCountry = await GameCountry.create({
        gameID: data.gameID,
        locale: data.locale,
      });
      // console.log('New Game Difficulty', newGameDifficulty);
      return this.findGameCountryByName(newGameCountry.locale, next);
    } catch (err) {
      return next(err);
    }
  }

  public async findGameCountryByName(
    locale: string,
    next: NextFunction,
  ): Promise<GameCountry | void> {
    try {
      return GameCountry.findOne({
        where: { locale },
      });
    } catch (err) {
      return next(err);
    }
  }

  public async update(
    countryID: string,
    data: Partial<gameCountriesModel>,
    next: NextFunction,
  ): Promise<GameCountry | void> {
    try {
      await GameCountry.update({ ...data }, { where: { countryID } });
      return GameCountry.findByPk(countryID);
    } catch (err) {
      return next(err);
    }
  }

  public async getAll(next: NextFunction): Promise<GameCountry[] | void> {
    try {
      return GameCountry.findAll({});
    } catch (err) {
      return next(err);
    }
  }

  public async findById(
    genderID: string,
    next: NextFunction,
  ): Promise<GameCountry | void> {
    try {
      return GameCountry.findByPk(genderID);
    } catch (err) {
      return next(err);
    }
  }

  public async delete(
    countryID: string,
    next: NextFunction,
  ): Promise<GameCountry | void> {
    try {
      const game = await GameCountry.findByPk(countryID);
      await GameCountry.destroy({
        where: {
          countryID,
        },
      });
      return game;
    } catch (err) {
      return next(err);
    }
  }
}
