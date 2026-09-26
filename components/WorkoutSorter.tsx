"use client";

import { useState } from "react";
import WorkoutCard from "@/components/WorkoutCard";
import type { Workout } from "@/types/workout";

interface WorkoutSorterProps {
  workouts: Workout[];
}

type SortOption = "duration" | "calories" | "rating";

export default function WorkoutSorter({
  workouts,
}: WorkoutSorterProps) {
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    }

    if (sortBy === "calories") {
      return a.caloriesBurned - b.caloriesBurned;
    }

    return b.rating - a.rating;
  });

  return (
    <div>
      {/* Sort */}
      <div className="mb-6 flex items-center justify-end gap-3">
        <label
          htmlFor="sort"
          className="text-xs font-bold uppercase tracking-wider text-white/50"
        >
          Sort By
        </label>

        <select
          id="sort"
          value={sortBy}
          onChange={(event) =>
            setSortBy(event.target.value as SortOption)
          }
          className="rounded-lg border border-white/10 bg-[#171920] px-4 py-2 text-sm font-medium text-white outline-none"
        >
          <option value="duration">Duration</option>
          <option value="calories">Calories</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {/* Workouts */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sortedWorkouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
          />
        ))}
      </div>
    </div>
  );
}