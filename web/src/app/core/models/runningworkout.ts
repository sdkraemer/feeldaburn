import { IWorkout, Workout } from "./workout";
import { IRunningWorkout } from "./runningworkout.interface";

export class RunningWorkout extends Workout implements IRunningWorkout {
  distance?: number;
  elapsed_time: number;
  heartrate: number;

  constructor(options: IRunningWorkout) {
    super(options);
    this.type = "RUNNING";
    this.distance = options.distance;
    this.elapsed_time = options.elapsed_time;
    this.heartrate = options.heartrate;
  }
}
