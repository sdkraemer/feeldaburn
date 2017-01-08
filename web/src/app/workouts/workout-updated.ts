export interface IWorkout {
    _id: string;
    name: string;
    notes: string;
    createdAt: Date;
    completedAt: Date;
}

export interface IRunningWorkout extends IWorkout{
    distance: number;
}

export interface IStrengthTrainingWorkout extends IWorkout {
    guide: string;
    exercises: IWorkoutExercise[];
}

export class Workout implements IWorkout{
  _id: string;
  name: string;
  notes: string;
  createdAt: Date;
  completedAt: Date;

  constructor(options: IWorkout){
    this._id = options._id;
    this.name = options.name;
    this.notes = options.notes;
    this.createdAt = options.createdAt;
  }
}

export class StrengthTrainingWorkout extends Workout implements IStrengthTrainingWorkout {
    guide: string;
    exercises: IWorkoutExercise[];

    constructor(options: IStrengthTrainingWorkout){
        super(options);
        this.guide = options.guide;
        this.exercises = options.exercises;
    }
}

export class RunningWorkout extends Workout implements IRunningWorkout {
    distance: number;
    constructor(options: IRunningWorkout) {
        super(options);
        this.distance = options.distance;
    }
}

// export enum WorkoutType {
//   STRENGTH_TRAINING,
//   RUNNING,
//   CYCLING
// }





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