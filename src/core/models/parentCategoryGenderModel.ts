export interface IParentCategoryGender {
  parentCategoryGenderID: string;
  gender: string;
}

export class parentCategoryGenderModel implements IParentCategoryGender {
  constructor(
    public parentCategoryGenderID: string = '',
    public gender: string = '',
  ) {}
}
