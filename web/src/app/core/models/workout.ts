export interface IWorkout {
    _id: string;
    type?: string;
    name?: string;
    notes?: string;
    createdAt?: Date;
    isCompleted?: boolean;
    completedAt?: Date;
}

export class Workout implements IWorkout{
  _id: string;
  type?: string;
  name?: string;
  notes?: string;
  createdAt?: Date;
  isCompleted?: boolean;
  completedAt?: Date;

  constructor(options: IWorkout){
    this._id = options._id;
    this.name = options.name;
    this.notes = options.notes;
    this.createdAt = options.createdAt;
    this.isCompleted = options.isCompleted;
    this.completedAt = options.completedAt;
  }
}