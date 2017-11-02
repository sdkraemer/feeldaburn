import { ISet, Set } from "./set";
export interface IWeightsSet extends ISet {
  weight?: number;
  adjustWeight: string;
}

export class WeightsSet extends Set implements IWeightsSet {
  weight?: number;
  adjustWeight: string;
  constructor(options: IWeightsSet) {
    super(options);
    this.weight = options.weight;
    this.adjustWeight = options.adjustWeight;
  }
}
