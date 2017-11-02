export interface ISet {
  repetitions?: number;
  side: string;
}

export class Set implements ISet {
  repetitions?: number;
  side: string;

  constructor(options: ISet) {
    this.repetitions = options.repetitions;
    this.side = options.side;
  }
}
