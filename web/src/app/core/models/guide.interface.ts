import { IGuideExercise } from './guideexercise.interface';
export interface IGuide {
    _id: string;
    name: string;
    description: string;
    exercises: IGuideExercise[];
    createdAt: Date;
}