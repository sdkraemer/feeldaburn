import { workoutType } from "./workouttype";
export interface IGuideExercise {
  _id: string;
  name: string;
  sided: boolean;
  type: workoutType;
  order: number;
}
