To Start:
nodemon index.js
Listens on port 3000

Where I left off:
    -Added mongo image to docker-compose file
    -Created ./lib/accessDB.js, added it to index.js
    -Now I need t connect to mongo in accessDB


The way I currently have it setup is web uses nodejs to serve content.
Go into web, do a docker-compose build after running ng build
Then go to api and run a docker-compose build then docker-compose up

User
WorkoutGuide
    Activity[]
        ISet[]
            RepSet
            WeightedSet
Workout
Schedule


Example Schemas:

WorkoutGuide: {
    name: String,
    
}


Workout: {
    name: "P90X3 Eccentric Lower"
    workoutGuideId: "###"
    userId: "###",
    createdAt: DateTime,
    completedAt: DateTime,
    activities: [
        {
            activityId: "###", //Squat
            sets: [
                {
                    setId: "###",
                    reps: "10",
                    weight: "45"
                }
            ]
        },
        {
            activityId: "###", //Lunge
            sets: [
                {
                    setId: "###", //Right
                    reps: "10",
                    weight: "35"
                },
                {
                    setId: "###", //Left
                    reps: "8",
                    weight: "35"
                }
            ]
        },
        {

        }
    ]
}

Activity: {
    name: "Lunge"
    sets: [
        {
            setId: "###", //set type, id for repset or weightedset
            name: "Right", //
        }
    ]
}

--12/26: Working on trying out workouttype enum to see if that will work with sub component rendering
--1/1: Sided is acting up, shows as null and null type in robomongo. Post only working. Have to 
  allow updating guide, then retrieve exercises on created ones.
--1/2: working on saving workout data. Was going to try and save running workout and see if I could get distance saved.
 -- Was going to populate Workout.workout  = new RunningWorkout on save in component.
 --1/3: Just got strength training./running specific workouts to save. Need to make it so the view shows updated stuff, and get put to work.
