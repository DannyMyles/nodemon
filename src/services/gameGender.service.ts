import GameGender from '../db/entities/gameGenderEntity';
import { gameGenderModel } from '../core/models/gameGenderModel';

import { NextFunction } from 'express';

export default class GameGenderService {
  public async createGameGender(
    data: Omit<gameGenderModel, 'genderID'>,
    next: NextFunction,
  ): Promise<GameGender | void> {
    try {
      const newGameGender = await GameGender.create({
        gameID: data.gameID,
        gender: data.gender,
      });
      // console.log('New Game Difficulty', newGameDifficulty);
      return this.findGameGenderByName(newGameGender.gender, next);
    } catch (err) {
      return next(err);
    }
  }

  public async findGameGenderByName(
    gender: string,
    next: NextFunction,
  ): Promise<GameGender | void> {
    try {
      return GameGender.findOne({
        where: { gender },
      });
    } catch (err) {
      return next(err);
    }
  }

  public async update(
    genderID: string,
    data: Partial<gameGenderModel>,
    next: NextFunction,
  ): Promise<GameGender | void> {
    try {
      await GameGender.update({ ...data }, { where: { genderID } });
      return GameGender.findByPk(genderID);
    } catch (err) {
      return next(err);
    }
  }

  public async getAll(next: NextFunction): Promise<GameGender[] | void> {
    try {
      return GameGender.findAll({});
    } catch (err) {
      return next(err);
    }
  }

  public async findById(
    genderID: string,
    next: NextFunction,
  ): Promise<GameGender | void> {
    try {
      return GameGender.findByPk(genderID);
    } catch (err) {
      return next(err);
    }
  }

  public async delete(
    genderID: string,
    next: NextFunction,
  ): Promise<GameGender | void> {
    try {
      const game = await GameGender.findByPk(genderID);
      await GameGender.destroy({
        where: {
          genderID,
        },
      });
      return game;
    } catch (err) {
      return next(err);
    }
  }
}
