import { IGuideExercise } from './guideexercise.interface';
import { IGuide } from './guide.interface';

export class Guide {
  _id: string;
  name: string;
  description: string;
  exercises: IGuideExercise[];
  createdAt: Date;

  constructor(options: IGuide){
    this._id = options._id;
    this.name = options.name;
    this.description = options.description;
    this.createdAt = options.createdAt;
    this.exercises = options.exercises;
  }
}