import { GAME_STATUSES } from '../../utils/constants';

export interface IGameImageModel {
  gameID: string;
  image: string;
  difficultyID: string;
  updatedBy: number;
  parentCategoryID: string;
  paidAmount: number;
  status: GAME_STATUSES;
  prize: number;
}

export class gameImageModel implements IGameImageModel {
  constructor(
    public gameID: string,
    public image: string,
    public difficultyID: string,
    public updatedBy: number,
    public parentCategoryID: string,
    public paidAmount: number,
    public status: GAME_STATUSES,
    public prize: number,
  ) {}
}
