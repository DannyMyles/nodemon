export interface IParentCategoryAgeBracket {
  parentCategoryID: string;
  from_age: string;
  to_age: string;
}

export class parentCategoryAgeBracketModel
  implements IParentCategoryAgeBracket
{
  constructor(
    public parentCategoryID: string = '',
    public from_age: string = '',
    public to_age: string = '',
  ) {}
}
