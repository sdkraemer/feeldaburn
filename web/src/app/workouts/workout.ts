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
  _id: string;
  workoutType?: string
}

export class WorkoutType implements IWorkoutType{
  _id: string;
  workoutType: string;

  constructor(options: IWorkoutType){
    this._id = options._id;
    this.workoutType = options.workoutType;
  }
}

export interface IStrengthTrainingWorkoutType extends IWorkoutType{
  guide: string;
  exercises?: IWorkoutExercise[];
}

export class StrengthTrainingWorkoutType extends WorkoutType implements IStrengthTrainingWorkoutType{
  guide: string;
  exercises?: IWorkoutExercise[];

  constructor(options: IStrengthTrainingWorkoutType){
    super(options);
    this.workoutType = "STRENGTH_TRAINING";
    this.guide = options.guide;
    this.exercises = options.exercises;
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

}

export interface ISet {
  repetitions: number;
  weight: number;
  side: string;
}

export class Set implements ISet {
  repetitions: number;
  weight: number;
  side: string;
  
  constructor(options: ISet) {
    this.repetitions = options.repetitions;
    this.weight = options.weight;
    this.side = options.side;
  }
}

export interface IWorkoutExercise {
  name: string;
  guide: string;
  sets: ISet[];
}

export class WorkoutExercise implements IWorkoutExercise {
  name: string;
  guide: string;
  sets: ISet[];

  constructor(options: IWorkoutExercise){
    this.name = options.name;
    this.guide = options.guide;
    this.sets = options.sets;
  }
}