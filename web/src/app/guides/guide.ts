
export type workoutType = 'REPS' | 'WEIGHTS' | 'COMPLETED';

export interface IGuideExercise {
  _id: string;
  name: string;
  sided: boolean;
  type: workoutType;
}

export class GuideExercise {
  _id: string;
  name: string;
  sided: boolean;
  type: workoutType;
}

export interface IGuide {
    _id: string;
    name: string;
    description: string;
    exercises: IGuideExercise[];
    createdAt: Date;
}

export class Guide {
  _id: string;
  name: string;
  description: string;
  exercises: GuideExercise[];
  createdAt: Date;

  constructor(options: IGuide){
    this._id = options._id;
    this.name = options.name;
    this.description = options.description;
    this.createdAt = options.createdAt;
    this.exercises = options.exercises;
  }
}