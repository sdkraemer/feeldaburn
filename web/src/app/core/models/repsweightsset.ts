import { RepetitionSet } from "./repetitionset";
import { IRepetitionSet } from "./repetitionset.interface";

export interface IRepsWeightsSet extends IRepetitionSet {
  weight?: number;
  adjustWeight: string;
}

export class RepsWeightsSet extends RepetitionSet implements IRepsWeightsSet {
  weight?: number;
  adjustWeight: string;
  constructor(options: IRepsWeightsSet) {
    super(options);
    this.weight = options.weight;
    this.adjustWeight = options.adjustWeight;
  }
}
