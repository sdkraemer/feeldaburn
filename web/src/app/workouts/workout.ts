export interface IWorkout {
    _id: string;
    name: string;
    notes: string;
    createdAt: Date;
    completedAt: Date;
    workoutType?: IWorkout;
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
    //this.workout = options.workout;
  }
}

// export enum WorkoutType {
//   STRENGTH_TRAINING,
//   RUNNING,
//   CYCLING
// }

export interface IWorkoutType {
  type: string
}

export class WorkoutType {
  type: string;

  constructor(){
  }
}

export interface IStrengthTrainingWorkoutType {
  type?: string;
  guide: string;
}

export class StrengthTrainingWorkoutType extends WorkoutType{
  guide: string;
  constructor(options: IStrengthTrainingWorkoutType){
    super();
    this.type = "STRENGTH_TRAINING";
    this.guide = options.guide;
  }
}

export interface IRunningWorkoutType {
  type?: string;
  distance: number;
}

export class RunningWorkoutType extends WorkoutType{
  distance: number;
  constructor(options: IRunningWorkoutType){
    super();
    this.type = "RUNNING";
    this.distance = options.distance;
  }
}