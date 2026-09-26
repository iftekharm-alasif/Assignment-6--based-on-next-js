"use client";

import Image from "next/image";
import Link from "next/link";
import type { Workout } from "@/types/workout";
import { useWorkout } from "@/context/WorkoutContext";

interface PlanWorkoutCardProps {
  workout: Workout;
  saved?: boolean;
}

const PlanWorkoutCard = ({
  workout,
  saved = false,
}: PlanWorkoutCardProps) => {
  const { removeFromPlan, removeFromSaved } = useWorkout();

  const handleRemove = () => {
    if (saved) {
      removeFromSaved(workout.id);
    } else {
      removeFromPlan(workout.id);
    }
  };

  return (
    <article className="border border-white/10 bg-[#171717] p-4">
      <div className="flex gap-4">
        {/* Thumbnail */}
        <div className="relative h-24 w-24 shrink-0 overflow-hidden">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-lg font-black uppercase text-white">
            {workout.name}
          </h2>

          <p className="mt-1 text-sm text-white/40">
            {workout.equipment}
          </p>

          <div className="mt-3 flex flex-wrap gap-4 text-xs font-bold text-white/50">
            <span>{workout.duration} min</span>
            <span>{workout.caloriesBurned} cal</span>
            <span>★ {workout.rating}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex flex-wrap gap-3 border-t border-white/10 pt-4">
        <Link
          href={`/workout/${workout.id}`}
          className="border border-white/20 px-4 py-2 text-xs font-black uppercase text-white transition hover:border-[#ccff00] hover:text-[#ccff00]"
        >
          View Details
        </Link>

        {!saved && (
          <button
            type="button"
            className="border border-[#ccff00]/30 px-4 py-2 text-xs font-black uppercase text-[#ccff00] transition hover:bg-[#ccff00] hover:text-black"
          >
            Mark as Done
          </button>
        )}

        <button
          type="button"
          onClick={handleRemove}
          className="border border-red-500/30 px-4 py-2 text-xs font-black uppercase text-red-400 transition hover:bg-red-500 hover:text-white"
        >
          Remove
        </button>
      </div>
    </article>
  );
};

export default PlanWorkoutCard;