export interface IWorkout {
    _id: string;
    name: string;
    guide: string;
    notes: string;
    createdAt: Date;
    completedAt: Date;
    workoutType: IWorkoutType;
}

export class Workout {
  _id: string;
  name: string;
  guide: string;
  notes: string;
  createdAt: Date;
  completedAt: Date;
  workoutType: IWorkoutType;
  //schedule: string; schedule this workout is associated with
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