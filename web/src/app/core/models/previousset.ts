import { Set, ISet } from "./set";

export interface IPreviousSet extends ISet {
  completedAt: Date;
}

export class PreviousSet extends Set {
  completedAt: Date;

  constructor(options: IPreviousSet) {
    super(options);
    this.completedAt = options.completedAt;
  }
}
