import { IWorkout, Workout } from "./workout";
import { IWorkoutExercise, WorkoutExercise } from "./workoutexercise";

export interface IStrengthTrainingWorkout extends IWorkout {
  guide?: string;
  exercises?: IWorkoutExercise[];
  previousWorkouts?: IStrengthTrainingWorkout[];
}

export class StrengthTrainingWorkout extends Workout
  implements IStrengthTrainingWorkout {
  guide: string;
  exercises: IWorkoutExercise[];
  previousWorkouts: IStrengthTrainingWorkout[];

  constructor(options: IStrengthTrainingWorkout) {
    super(options);
    this.type = "STRENGTH_TRAINING";
    this.guide = options.guide;
    this.exercises = options.exercises;
    this.previousWorkouts = options.previousWorkouts;
  }
}
