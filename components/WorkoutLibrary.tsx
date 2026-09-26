import type { Workout } from "@/types/workout";
import WorkoutSorter from "@/components/WorkoutSorter";

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

  return <WorkoutSorter workouts={workouts} />;
}