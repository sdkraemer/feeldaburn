export interface IWorkout {
    _id: string;
    name: string;
    guide: string;
    notes: string;
    createdAt: Date;
    completedAt: Date;
}

export class Workout {
  _id: string;
  name: string;
  guide: string;
  notes: string;
  createdAt: Date;
  completedAt: Date;
}