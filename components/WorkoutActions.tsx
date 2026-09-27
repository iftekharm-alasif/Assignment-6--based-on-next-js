"use client";

import type { Workout } from "@/types/workout";

import { useWorkout } from "@/context/WorkoutContext";

interface WorkoutActionsProps {
  workout: Workout;
}

const WorkoutActions = ({ workout }: WorkoutActionsProps) => {
  const {
    addToPlan,
    saveWorkout,
    isInPlan,
    isSaved,
  } = useWorkout();

  const alreadyInPlan = isInPlan(workout.id);
  const alreadySaved = isSaved(workout.id);

  return (
    <div className="mt-5 flex flex-wrap gap-3">
      {/* Add to Plan */}
      <button
        type="button"
        onClick={() => addToPlan(workout)}
        disabled={alreadyInPlan}
        className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[11px] font-black uppercase transition ${
          alreadyInPlan
            ? "cursor-not-allowed bg-white/10 text-white/30"
            : "bg-[#ccff00] text-black hover:bg-white"
        }`}
      >
        <span>⊞</span>
        {alreadyInPlan
          ? "Already in plan"
          : "Add to today's plan"}
      </button>

      {/* Save */}
      <button
        type="button"
        onClick={() => saveWorkout(workout)}
        disabled={alreadySaved}
        className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-[11px] font-bold uppercase transition ${
          alreadySaved
            ? "cursor-not-allowed border-white/10 text-white/30"
            : "border-white/20 text-white/80 hover:border-white/40 hover:text-white"
        }`}
      >
        <span>♡</span>
        {alreadySaved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
};

export default WorkoutActions;