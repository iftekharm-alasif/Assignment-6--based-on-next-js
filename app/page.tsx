import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import type { Workout } from "@/types/workout";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

async function getWorkouts(): Promise<Workout[]> {
  const response = await fetch(API_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  return response.json();
}

export default async function Home() {
  const workouts = await getWorkouts();

  return (
    <main>
      <Hero />

      {/* Workout Library */}
      <section
        id="library"
        className="bg-[#0d0d0d] px-5 py-16 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-7xl">
          {/* Section Heading */}
          <div className="mb-10">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#ccff00]">
              The Library
            </p>

            <h2 className="mt-3 text-4xl font-black uppercase tracking-tight text-white md:text-5xl">
              Explore Workouts
            </h2>

            <p className="mt-4 text-white/50">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Workout Grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}