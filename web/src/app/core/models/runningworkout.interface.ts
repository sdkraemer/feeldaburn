import { IWorkout } from "./workout";
export interface IRunningWorkout extends IWorkout {
  distance?: number;
  elapsed_time: number;
  pace: number;
  heartrate: number;
}
