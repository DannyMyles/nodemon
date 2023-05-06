export interface IParentCategoryCountries {
  parentCategoryID: string;
  locale: string;
}

export class parentCategoryCountriesModel implements IParentCategoryCountries {
  constructor(
    public parentCategoryID: string = '',
    public locale: string = '',
  ) {}
}
