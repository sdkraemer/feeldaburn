export interface ISet {
  side: string;
}

export class Set implements ISet {
  side: string;

  constructor(options: ISet) {
    this.side = options.side;
  }
}
