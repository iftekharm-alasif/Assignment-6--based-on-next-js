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
    <div className="mt-12 flex flex-wrap gap-4">
      <button
        onClick={() => addToPlan(workout)}
        disabled={alreadyInPlan}
        className={`px-6 py-3 text-sm font-black uppercase transition ${
          alreadyInPlan
            ? "cursor-not-allowed bg-white/20 text-white/40"
            : "bg-[#ccff00] text-black hover:bg-white"
        }`}
      >
        {alreadyInPlan ? "Already in Plan" : "Add to Today's Plan"}
      </button>

      <button
        onClick={() => saveWorkout(workout)}
        disabled={alreadySaved}
        className={`border px-6 py-3 text-sm font-black uppercase transition ${
          alreadySaved
            ? "cursor-not-allowed border-white/10 text-white/30"
            : "border-white/30 text-white hover:border-[#ccff00] hover:text-[#ccff00]"
        }`}
      >
        {alreadySaved ? "Saved" : "Save for Later"}
      </button>
    </div>
  );
};

export default WorkoutActions;