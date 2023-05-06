export interface IGameAge {
  gameID: string;
  from_age: string;
  to_age: string;
}

export class gameAgeModel implements IGameAge {
  constructor(
    public gameID: string = '',
    public from_age: string = '',
    public to_age: string = '',
  ) {}
}
