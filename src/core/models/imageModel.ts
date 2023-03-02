export interface IImage {
  type: string;
  name: string;
}

export class ImageModel implements IImage {
  constructor(public type: string = '', public name: string = '') {}
}
