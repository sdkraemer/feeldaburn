export interface IWorkout {
    _id: string;
    name: string;
    notes: string;
    createdAt: Date;
}

export class Workout {
  _id: string;
  name: string;
  notes: string;
  createdAt: Date;
}