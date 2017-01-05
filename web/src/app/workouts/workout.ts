export interface IWorkout {
    _id: string;
    name: string;
    notes: string;
    createdAt: Date;
    completedAt: Date;
    workoutType?: IWorkoutType;
}

export class Workout {
  _id: string;
  name: string;
  notes: string;
  createdAt: Date;
  completedAt: Date;
  workoutType?: IWorkoutType;

  constructor(options: IWorkout){
    this._id = options._id;
    this.name = options.name;
    this.notes = options.notes;
    this.createdAt = options.createdAt;
    this.workoutType = options.workoutType;
  }
}

// export enum WorkoutType {
//   STRENGTH_TRAINING,
//   RUNNING,
//   CYCLING
// }

export interface IWorkoutType {
  workoutType?: string
}

export class WorkoutType implements IWorkoutType{
  workoutType: string;

  constructor(options: IWorkoutType){
    this.workoutType = options.workoutType;
  }
}

export interface IStrengthTrainingWorkoutType extends IWorkoutType{
  guide: string;
}

export class StrengthTrainingWorkoutType extends WorkoutType implements IStrengthTrainingWorkoutType{
  guide: string;
  constructor(options: IStrengthTrainingWorkoutType){
    super(options);
    this.workoutType = "STRENGTH_TRAINING";
    this.guide = options.guide;
  }

  set workoutType(value: string){
    this.workoutType = "STRENGTH_TRAINING";
  }
}

export interface IRunningWorkoutType extends IWorkoutType{
  distance: number;
}

export class RunningWorkoutType extends WorkoutType implements IRunningWorkoutType{
  distance: number;
  constructor(options: IRunningWorkoutType){
    super(options);
    this.workoutType = "RUNNING";
    this.distance = options.distance;
  }

  set workoutType(value: string){
    this.workoutType = "RUNNING";
  }
}