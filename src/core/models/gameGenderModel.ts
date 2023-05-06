export interface IGameGender {
  gameID: string;
  gender: string;
}

export class gameGenderModel implements IGameGender {
  constructor(public gameID: string = '', public gender: string = '') {}
}
