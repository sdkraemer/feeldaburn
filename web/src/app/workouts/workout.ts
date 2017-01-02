export interface IWorkout {
    _id: string;
    name: string;
    guide: string;
    notes: string;
    createdAt: Date;
    completedAt: Date;
    type: string;
}

export class Workout {
  _id: string;
  name: string;
  guide: string;
  notes: string;
  createdAt: Date;
  completedAt: Date;
  type: string;
  //schedule: string; schedule this workout is associated with

  constructor(options: IWorkout){
    this._id = options._id;
    this.name = options.name;
    this.guide = options.guide;
    this.notes = options.notes;
    this.createdAt = options.createdAt;
    this.type = options.type;
  }
}

export enum WorkoutType {
  STRENGTH_TRAINING,
  RUNNING,
  CYCLING
}

export interface IWorkoutType {
  
}

export class StrengthTrainingWorkoutType implements IWorkoutType{
  guide: string;
}

export class RunningWorkoutType implements IWorkoutType{
  distance: number;
  distanceType: string;
  calories: number;
}