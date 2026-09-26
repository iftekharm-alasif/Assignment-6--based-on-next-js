import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import type { Workout } from "@/types/workout";
import WorkoutActions from "@/components/WorkoutActions";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

interface WorkoutDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getWorkout(id: string): Promise<Workout | null> {
  try {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Workout fetch failed:", error);
    return null;
  }
}

export default async function WorkoutDetailsPage({
  params,
}: WorkoutDetailsPageProps) {
  const { id } = await params;

  const workout = await getWorkout(id);

  if (!workout) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0d0e12] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Back */}
        <Link
          href="/#library"
          className="mb-6 inline-flex items-center text-xs font-medium text-white/40 transition hover:text-[#ccff00]"
        >
          ← Back to workouts
        </Link>

        {/* Main Details */}
        <section className="grid overflow-hidden border border-white/5 bg-[#101116] lg:grid-cols-[1fr_0.95fr]">
          {/* Left - Image */}
          <div className="p-4 sm:p-6">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={workout.image}
                alt={workout.name}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>

          {/* Right - Details */}
          <div className="px-4 pb-6 pt-4 sm:px-6 sm:pt-6">
            {/* Title */}
            <h1 className="text-3xl font-black uppercase leading-none tracking-tight text-white sm:text-4xl">
              {workout.name}
            </h1>

            {/* Description */}
            <p className="mt-3 max-w-xl text-sm leading-5 text-white/50">
              {workout.description}
            </p>

            {/* Muscle Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-[#ccff00] px-3 py-1 text-[10px] font-black uppercase text-black"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* Specs */}
            <div className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-[#171920]">
              <SpecRow
                label="Equipment"
                value={workout.equipment}
              />

              <SpecRow
                label="Difficulty"
                value={workout.difficulty}
              />

              <SpecRow
                label="Sets"
                value={String(workout.sets)}
              />

              <SpecRow
                label="Reps"
                value={workout.reps}
              />

              <SpecRow
                label="Duration"
                value={`${workout.duration} min`}
              />

              <SpecRow
                label="Calories"
                value={`${workout.caloriesBurned} kcal`}
              />

              <SpecRow
                label="Rating"
                value={String(workout.rating)}
                highlight
              />
            </div>

            {/* Instructions */}
            <div className="mt-5">
              <h2 className="text-sm font-black uppercase tracking-wide text-white">
                Instructions
              </h2>

              <ol className="mt-3 space-y-3">
                {workout.instructions.map((instruction, index) => (
                  <li
                    key={instruction}
                    className="flex gap-3 text-xs leading-5 text-white/55"
                  >
                    <span className="shrink-0 font-bold text-white/35">
                      {index + 1}.
                    </span>

                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Buttons */}
            <WorkoutActions workout={workout} />
          </div>
        </section>
      </div>
    </main>
  );
}

/* Specs Row */
interface SpecRowProps {
  label: string;
  value: string;
  highlight?: boolean;
}

function SpecRow({ label, value, highlight = false }: SpecRowProps) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 px-4 py-3 last:border-b-0">
      <span className="text-[9px] font-bold uppercase tracking-wider text-white/35">
        {label}
      </span>

      <span
        className={`text-xs font-medium ${
          highlight ? "text-white" : "text-white/80"
        }`}
      >
        {value}
      </span>
    </div>
  );
}