import { Measurement } from "./measurement";
export class WeightMeasurement extends Measurement {
  weight: number;
  constructor(weight: number, _id: string, type: string, createdAt: Date) {
    super(_id, type, createdAt);
    this.weight = weight;
  }
}
