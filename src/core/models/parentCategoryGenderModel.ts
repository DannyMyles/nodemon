export interface IParentCategoryGender {
  parentCategoryID: string;
  gender: string;
}

export class parentCategoryGenderModel implements IParentCategoryGender {
  constructor(
    public parentCategoryID: string = '',
    public gender: string = '',
  ) {}
}
