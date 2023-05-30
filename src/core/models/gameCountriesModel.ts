export interface IGameCountries {
  countryID: string;
  gameID: string;
  locale: string;
}

export class gameCountriesModel implements IGameCountries {
  constructor(
    public countryID: string = '',
    public gameID: string = '',
    public locale: string = '',
  ) {}
}
