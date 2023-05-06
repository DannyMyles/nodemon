export interface IGameImageModel {
  gameID: string;
  image: string;
  difficulty: string;
  dateAdded: Date;
  dateUpdated: Date;
  updatedBy: number;
  parentCategoryID: string;
  paidAmount: number;
  status: boolean;
  prize: number;
}

export class gameImageModel implements IGameImageModel {
  constructor(
    public gameID: string,
    public image: string,
    public difficulty: string,
    public dateAdded: Date,
    public dateUpdated: Date,
    public updatedBy: number,
    public parentCategoryID: string,
    public paidAmount: number,
    public status: boolean,
    public prize: number,
  ) {}
}
