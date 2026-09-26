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
  const response = await fetch(`${API_URL}/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
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
    <main className="min-h-screen bg-[#0d0d0d] px-5 py-12 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Back Button */}
        <Link
          href="/#library"
          className="mb-8 inline-flex text-sm font-bold uppercase tracking-wider text-white/50 transition hover:text-[#ccff00]"
        >
          ← Back to Library
        </Link>

        {/* Workout Details */}
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-[#171717]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div>
            {/* Muscle Groups */}
            <div className="flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="bg-[#ccff00] px-3 py-1 text-xs font-black uppercase text-black"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="mt-5 text-4xl font-black uppercase leading-none text-white md:text-6xl">
              {workout.name}
            </h1>

            {/* Description */}
            <p className="mt-6 leading-7 text-white/60">
              {workout.description}
            </p>

            {/* Specs */}
            <div className="mt-8 grid grid-cols-2 gap-px bg-white/10 md:grid-cols-3">
              {/* Equipment */}
              <div className="bg-[#171717] p-4">
                <p className="text-xs uppercase text-white/40">
                  Equipment
                </p>
                <p className="mt-2 font-bold text-white">
                  {workout.equipment}
                </p>
              </div>

              {/* Difficulty */}
              <div className="bg-[#171717] p-4">
                <p className="text-xs uppercase text-white/40">
                  Difficulty
                </p>
                <p className="mt-2 font-bold text-white">
                  {workout.difficulty}
                </p>
              </div>

              {/* Sets */}
              <div className="bg-[#171717] p-4">
                <p className="text-xs uppercase text-white/40">
                  Sets
                </p>
                <p className="mt-2 font-bold text-white">
                  {workout.sets}
                </p>
              </div>

              {/* Reps */}
              <div className="bg-[#171717] p-4">
                <p className="text-xs uppercase text-white/40">
                  Reps
                </p>
                <p className="mt-2 font-bold text-white">
                  {workout.reps}
                </p>
              </div>

              {/* Duration */}
              <div className="bg-[#171717] p-4">
                <p className="text-xs uppercase text-white/40">
                  Duration
                </p>
                <p className="mt-2 font-bold text-white">
                  {workout.duration} min
                </p>
              </div>

              {/* Calories */}
              <div className="bg-[#171717] p-4">
                <p className="text-xs uppercase text-white/40">
                  Calories
                </p>
                <p className="mt-2 font-bold text-white">
                  {workout.caloriesBurned}
                </p>
              </div>

              {/* Rating */}
              <div className="bg-[#171717] p-4">
                <p className="text-xs uppercase text-white/40">
                  Rating
                </p>
                <p className="mt-2 font-bold text-[#ccff00]">
                  ★ {workout.rating}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <section className="mt-16 max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#ccff00]">
            How to perform
          </p>

          <h2 className="mt-3 text-3xl font-black uppercase text-white">
            Instructions
          </h2>

          <div className="mt-6 space-y-4">
            {workout.instructions.map((instruction, index) => (
              <div
                key={instruction}
                className="flex gap-4 border-b border-white/10 pb-4"
              >
                <span className="text-xl font-black text-[#ccff00]">
                  0{index + 1}
                </span>

                <p className="leading-7 text-white/60">
                  {instruction}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Actions */}
        <WorkoutActions workout={workout} />
      </div>
    </main>
  );
}