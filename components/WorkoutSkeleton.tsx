const WorkoutSkeleton = () => {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-white/10 bg-white/5 p-6"
        >
          <div className="skeleton h-6 w-3/4"></div>

          <div className="mt-4 space-y-3">
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-5/6"></div>
            <div className="skeleton h-4 w-2/3"></div>
          </div>

          <div className="mt-6 flex justify-between">
            <div className="skeleton h-8 w-20"></div>
            <div className="skeleton h-8 w-24"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkoutSkeleton;