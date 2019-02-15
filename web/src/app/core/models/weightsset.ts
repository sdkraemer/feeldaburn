import { IWeightsSet } from "./weightsset.interface";
import { Set } from "./set";

export class WeightsSet extends Set implements IWeightsSet {
  weight?: number;
  adjustWeight: string;

  constructor(options: IWeightsSet) {
    super(options);
    this.weight = options.weight;
    this.adjustWeight = options.adjustWeight;
  }
}
