export interface IGameAge {
  age_bracketID: string;
  gameID: string;
  from_age: string;
  to_age: string;
}

export class gameAgeModel implements IGameAge {
  constructor(
    public age_bracketID: string = '',
    public gameID: string = '',
    public from_age: string = '',
    public to_age: string = '',
  ) {}
}
