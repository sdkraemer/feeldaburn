import { ISet } from "./set";

export interface IWorkoutExercise {
  name: string;
  guideExercise: string;
  sets: ISet[];
  type: string;
  isCompleted?: boolean;
  seconds?: number;
}

export class WorkoutExercise implements IWorkoutExercise {
  name: string;
  guideExercise: string;
  sets: ISet[];
  type: string;
  isCompleted?: boolean;
  seconds: number;

  constructor(options: IWorkoutExercise) {
    this.name = options.name;
    this.guideExercise = options.guideExercise;
    this.sets = options.sets;
    this.type = options.type;
    this.isCompleted = options.isCompleted;
    this.seconds = options.seconds;
  }
}
