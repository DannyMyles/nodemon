export interface IParentCategory {
  parentCategoryID: string;
  categoryName: string;
  enabled: boolean;
  image: string;
}

export class parentCategoryModel implements IParentCategory {
  constructor(
    public parentCategoryID: string = '',
    public categoryName: string = '',
    public enabled: boolean = false,
    public image: string = '',
  ) {}
}
