import { IWorkout } from "./workout";
export interface IRunningWorkout extends IWorkout {
  distance?: number;
  elapsed_time: number;
  heartrate: number;
}
