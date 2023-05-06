export interface IGameDifficulty {
  difficultyID: string;
  difficultyDescription: string;
}

export class gameDifficultyModel implements IGameDifficulty {
  constructor(
    public difficultyID: string = '',
    public difficultyDescription: string = '',
  ) {}
}
