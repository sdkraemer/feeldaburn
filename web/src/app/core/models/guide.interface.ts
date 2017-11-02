import { IGuideExercise } from './guideexercise'
export interface IGuide {
    _id: string;
    name: string;
    description: string;
    exercises: IGuideExercise[];
    createdAt: Date;
}