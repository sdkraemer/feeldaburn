import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { IWorkout, IStrengthTrainingWorkout } from "../../core";
import { IGuide, Guide } from "../../core";
import { WorkoutService } from "app/workouts/workout.service";
import { GuideService } from "app/guides/guide.service";
import { WorkoutFactory } from "app/core/factories/workoutfactory";

@Injectable()
export class WorkoutFactoryService {
  private workoutFactory: WorkoutFactory;

  constructor(
    private workoutService: WorkoutService,
    private guideService: GuideService
  ) {
    this.workoutFactory = new WorkoutFactory();
  }

  public createOrRetrieve(
    workoutId,
    workoutType,
    guideId
  ): Observable<IWorkout> {
    let workout$;
    if (workoutId) {
      workout$ = this.retrieveExistingWorkout(workoutId);
    } else {
      workout$ = this.createNewWorkout(workoutType, guideId);
    }
    return workout$;
  }

  private retrieveExistingWorkout(workoutId) {
    return this.workoutService.getWorkout(workoutId);
  }

  private createNewWorkout(workoutType, guideId): Observable<IWorkout> {
    let workout$;
    if (guideId) {
      workout$ = this.retrieveStrengthTrainingWorkoutWithPreviousWorkouts(
        guideId
      );
    } else {
      workout$ = Observable.create(observer => {
        let workout = this.workoutFactory.createFromWorkoutType(workoutType);
        observer.next(workout);
      });
    }
    return workout$;
  }

  private retrieveStrengthTrainingWorkoutWithPreviousWorkouts(guideId) {
    const guide$ = this.guideService.getGuide(guideId);
    const previousWorkouts$ = this.workoutService.getPreviousStrengthTrainingWorkouts(
      guideId
    );
    let workout$ = Observable.zip(
      guide$,
      previousWorkouts$,
      (guide: IGuide, previousWorkouts) => {
        let workout = <IStrengthTrainingWorkout>this.workoutFactory.createFromGuide(
          guide
        );
        workout.previousWorkouts = previousWorkouts;
        return workout;
      }
    );
    return workout$;
  }
}
