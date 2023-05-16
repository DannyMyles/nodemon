export interface IParentCategoryAgeBracket {
  parentCategoryAgeBracketID: string;
  from_age: string;
  to_age: string;
}

export class parentCategoryAgeBracketModel
  implements IParentCategoryAgeBracket
{
  constructor(
    public parentCategoryAgeBracketID: string = '',
    public from_age: string = '',
    public to_age: string = '',
  ) {}
}
