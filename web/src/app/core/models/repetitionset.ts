import { Set } from "./set";
import { IRepetitionSet } from "./repetitionset.interface";

export class RepetitionSet extends Set implements IRepetitionSet {
  repetitions?: number;

  constructor(options: IRepetitionSet) {
    super(options);
    this.repetitions = options.repetitions;
  }
}
