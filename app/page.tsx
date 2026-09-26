import { Suspense } from "react";
import Hero from "@/components/Hero";
import WorkoutSkeleton from "@/components/WorkoutSkeleton";
import WorkoutLibrary from "@/components/WorkoutLibrary";

export default function Home() {
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

          {/* Workout Loading */}
          <Suspense fallback={<WorkoutSkeleton />}>
            <WorkoutLibrary />
          </Suspense>
        </div>
      </section>
    </main>
  );
}