import { WorkoutExercise, IWorkoutExercise } from "./workoutexercise";

export interface IPreviousWorkoutExercise extends IWorkoutExercise {
  completedAt?: Date;
}

export class PreviousWorkoutExercise extends WorkoutExercise
  implements IPreviousWorkoutExercise {
  completedAt?: Date;
  constructor(options: IPreviousWorkoutExercise) {
    super(options);
    this.completedAt = options.completedAt;
  }
}
