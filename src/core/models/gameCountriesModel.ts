export interface IGameCountries {
  gameID: string;
  locale: string;
}

export class gameCountriesModel implements IGameCountries {
  constructor(public gameID: string = '', public locale: string = '') {}
}
