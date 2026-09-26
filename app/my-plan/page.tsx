"use client";

import { useState } from "react";
import Link from "next/link";

import { useWorkout } from "@/context/WorkoutContext";
import PlanWorkoutCard from "@/components/PlanWorkoutCard";

type Tab = "plan" | "saved";

const MyPlanPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("plan");

  const { plan, saved } = useWorkout();

  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  const activeWorkouts = activeTab === "plan" ? plan : saved;

  return (
    <main className="min-h-screen bg-[#0d0d0d] px-5 py-12 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#ccff00]">
            Your Workout
          </p>

          <h1 className="mt-3 text-4xl font-black uppercase tracking-tight text-white md:text-6xl">
            My Plan
          </h1>

          <p className="mt-4 text-white/50">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Metrics */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="border border-white/10 bg-[#171717] p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-white/40">
              Exercises
            </p>

            <p className="mt-2 text-3xl font-black text-white">
              {plan.length}
            </p>
          </div>

          <div className="border border-white/10 bg-[#171717] p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-white/40">
              Minutes
            </p>

            <p className="mt-2 text-3xl font-black text-white">
              {totalMinutes}
            </p>
          </div>

          <div className="border border-white/10 bg-[#171717] p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-white/40">
              Calories
            </p>

            <p className="mt-2 text-3xl font-black text-[#ccff00]">
              {totalCalories}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12 flex gap-6 border-b border-white/10">
          <button
            type="button"
            onClick={() => setActiveTab("plan")}
            className={`border-b-2 pb-4 text-sm font-black uppercase tracking-wider ${
              activeTab === "plan"
                ? "border-[#ccff00] text-[#ccff00]"
                : "border-transparent text-white/40"
            }`}
          >
            Today&apos;s Plan ({plan.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`border-b-2 pb-4 text-sm font-black uppercase tracking-wider ${
              activeTab === "saved"
                ? "border-[#ccff00] text-[#ccff00]"
                : "border-transparent text-white/40"
            }`}
          >
            Saved ({saved.length})
          </button>
        </div>

        {/* Workout List */}
        <section className="mt-8">
          {activeWorkouts.length === 0 ? (
            <div className="border border-dashed border-white/20 py-20 text-center">
              <h2 className="text-2xl font-black uppercase text-white">
                Nothing Here Yet
              </h2>

              <p className="mt-3 text-white/40">
                Browse the library and add a lift to get today moving.
              </p>

              <Link
                href="/#library"
                className="mt-6 inline-flex bg-[#ccff00] px-6 py-3 text-sm font-black uppercase text-black transition hover:bg-white"
              >
                Go to Workouts
              </Link>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {activeWorkouts.map((workout) => (
                <PlanWorkoutCard
                  key={workout.id}
                  workout={workout}
                  saved={activeTab === "saved"}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default MyPlanPage;