export type workoutType = 'REPS' | 'WEIGHTS' | 'COMPLETED';

export interface IGuideExercise {
  _id: string;
  name: string;
  sided: boolean;
  type: workoutType;
  order: number;
}

export class GuideExercise {
  _id: string;
  name: string;
  sided: boolean;
  type: workoutType;
  order: number;
}

