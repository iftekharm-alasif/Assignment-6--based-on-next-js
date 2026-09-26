import Image from "next/image";
import Link from "next/link";
import type { Workout } from "@/types/workout";

interface WorkoutCardProps {
  workout: Workout;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden border border-white/10 bg-[#171717] transition hover:-translate-y-1 hover:border-[#ccff00]/40"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="bg-black/70 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#ccff00]"
            >
              {muscle}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-black uppercase text-white">
          {workout.name}
        </h3>

        <p className="mt-2 text-sm text-white/50">
          {workout.equipment}
        </p>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/10 pt-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">
              Duration
            </p>
            <p className="mt-1 text-sm font-bold text-white">
              {workout.duration} min
            </p>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">
              Calories
            </p>
            <p className="mt-1 text-sm font-bold text-white">
              {workout.caloriesBurned}
            </p>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">
              Rating
            </p>
            <p className="mt-1 text-sm font-bold text-[#ccff00]">
              ★ {workout.rating}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;