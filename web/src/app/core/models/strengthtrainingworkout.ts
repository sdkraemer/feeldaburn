import { IWorkout, Workout } from "./workout";
import { IWorkoutExercise, WorkoutExercise } from "./workoutexercise";

export interface IStrengthTrainingWorkout extends IWorkout {
  guide?: string;
  exercises?: IWorkoutExercise[];
}

export class StrengthTrainingWorkout extends Workout
  implements IStrengthTrainingWorkout {
  guide: string;
  exercises: IWorkoutExercise[];

  constructor(options: IStrengthTrainingWorkout) {
    super(options);
    this.type = "STRENGTH_TRAINING";
    this.guide = options.guide;
    this.exercises = options.exercises;
  }
}
