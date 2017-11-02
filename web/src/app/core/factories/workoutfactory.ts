import { IWorkout, RunningWorkout, StrengthTrainingWorkout } from '../';

export class WorkoutFactory {
    public static create(data): IWorkout {
        let workout: IWorkout = null;
        if(data.type == 'RUNNING'){
            workout = new RunningWorkout(data);
        }
        else if(data.type = 'STRENGTH_TRAINING'){
            workout = new StrengthTrainingWorkout(data);
        }
        return workout;
    }

}