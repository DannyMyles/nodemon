export interface IParentCategoryCountries {
  parentCategoryCountriesID: string;
  locale: string;
}

export class parentCategoryCountriesModel implements IParentCategoryCountries {
  constructor(
    public parentCategoryCountriesID: string = '',
    public locale: string = '',
  ) {}
}
