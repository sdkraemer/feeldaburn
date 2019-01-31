import {
  IWorkout,
  RunningWorkout,
  StrengthTrainingWorkout,
  IStrengthTrainingWorkout,
  IGuide,
  WorkoutExercise,
  IWorkoutExercise,
  IGuideExercise,
  IRunningWorkout,
  RepetitionSet,
  ISet,
  WeightsSet
} from "../";
import { TimeDuration } from "../models/timeduration";

export class WorkoutFactory {
  public createFromFormData(formData): IWorkout {
    let workout: IWorkout = null;
    if (formData.type == "RUNNING") {
      workout = this.createRunningWorkout(workout, formData);
    } else if ((formData.type = "STRENGTH_TRAINING")) {
      workout = new StrengthTrainingWorkout(formData);
    }
    return workout;
  }

  private createRunningWorkout(workout: IWorkout, formData: any) {
    formData.elapsed_time = this.calculateSecondsFromTimeDuration(formData);
    workout = new RunningWorkout(formData);
    return workout;
  }

  private calculateSecondsFromTimeDuration(formData: any) {
    let timeDuration: TimeDuration = formData.elapsed_time;
    let elapsedTimeInSeconds = timeDuration.minutes * 60 + timeDuration.seconds;
    return elapsedTimeInSeconds;
  }

  public createFromGuide(guide: IGuide): IStrengthTrainingWorkout {
    let workout: IStrengthTrainingWorkout;
    return new StrengthTrainingWorkout({
      _id: null,
      guide: guide._id,
      name: guide.name,
      exercises: this.createExercisesFromGuide(guide)
    });
  }

  private createExercisesFromGuide(guide: IGuide) {
    let workoutExercises: IWorkoutExercise[] = [];
    guide.exercises.forEach(function(exercise: IGuideExercise) {
      let workoutExercise = new WorkoutExercise({
        name: exercise.name,
        guideExercise: exercise._id,
        sets: [],
        type: exercise.type
      });

      if (exercise.type == "REPS" || exercise.type == "WEIGHTS") {
        if (exercise.sided) {
          workoutExercise.sets.push(this.createSet(exercise.type, "RIGHT"));
          workoutExercise.sets.push(this.createSet(exercise.type, "LEFT"));
        } else {
          workoutExercise.sets.push(this.createSet(exercise.type));
        }
      }

      workoutExercises.push(workoutExercise);
    }, this);

    return workoutExercises;
  }

  private createSet(type: string, side: string = "NONE") {
    let set: ISet = null;
    if (type == "REPS") {
      set = new RepetitionSet({
        side: side
      });
    } else if ((type = "WEIGHTS")) {
      set = new WeightsSet({
        side: side,
        adjustWeight: "NONE"
      });
    }

    return set;
  }

  public createFromWorkoutType(workoutType: string): IWorkout {
    if (workoutType == "RUNNING") {
      return this.createEmptyRunningWorkout();
    } else {
      console.error("Unknown workout type");
    }
  }

  private createEmptyRunningWorkout(): IRunningWorkout {
    return new RunningWorkout({
      _id: null,
      distance: null,
      elapsed_time: null,
      pace: null,
      heartrate: null,
      calories: null
    });
  }
}
