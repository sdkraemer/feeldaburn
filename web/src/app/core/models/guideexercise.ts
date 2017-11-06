import { workoutType } from "./workouttype";
import { IGuideExercise } from "./guideexercise.interface";

export class GuideExercise implements IGuideExercise {
  _id: string;
  name: string;
  sided: boolean;
  type: workoutType;
  order: number;
  constructor(
    _id: string,
    name: string,
    sided: boolean,
    type: workoutType,
    order: number
  ) {
    this._id = _id;
    this.name = name;
    this.sided = sided;
    this.type = type;
    this.order = order;
  }
}

