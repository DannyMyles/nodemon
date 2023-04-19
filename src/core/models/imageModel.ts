export interface IImage {
  type: string;
  name: string;
  userId: number;
}

export class ImageModel implements IImage {
  constructor(
    public type: string = '',
    public name: string = '',
    public userId: number = 0,
  ) {}
}
