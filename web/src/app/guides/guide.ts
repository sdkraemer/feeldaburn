export interface IGuide {
    _id: string;
    name: string;
    description: string;
    createdAt: Date;
}

export class Guide {
  _id: string;
  name: string;
  description: string;
  createdAt: Date;

  constructor(options: IGuide){
    this._id = options._id;
    this.name = options.name;
    this.description = options.description;
    this.createdAt = options.createdAt;
  }
}