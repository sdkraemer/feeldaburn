import { Set } from "./set";
import { IRepetitionSet } from "./repetitionset.interface";

export class RepetitionSet extends Set implements IRepetitionSet {
  constructor(options: IRepetitionSet) {
    super(options);
  }
}
