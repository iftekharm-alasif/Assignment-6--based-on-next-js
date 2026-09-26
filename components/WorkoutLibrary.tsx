import WorkoutCard from "@/components/WorkoutCard";
import type { Workout } from "@/types/workout";

const API_URL = "https://api.api-store.workers.dev/api/fitlog";

async function getWorkouts(): Promise<Workout[]> {
  const response = await fetch(API_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  return response.json();
}

export default async function WorkoutLibrary() {
  const workouts = await getWorkouts();

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {workouts.map((workout) => (
        <WorkoutCard key={workout.id} workout={workout} />
      ))}
    </div>
  );
}