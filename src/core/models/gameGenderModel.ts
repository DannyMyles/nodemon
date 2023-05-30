export interface IGameGender {
  genderID: string;
  gameID: string;
  gender: string;
}

export class gameGenderModel implements IGameGender {
  constructor(
    public gameID: string = '',
    public gender: string = '',
    public genderID: string,
  ) {}
}
