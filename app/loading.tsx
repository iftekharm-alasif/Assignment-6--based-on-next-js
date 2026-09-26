export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <span className="loading loading-spinner loading-lg"></span>

        <p className="mt-4 text-lg font-medium">
          Loading workouts...
        </p>
      </div>
    </div>
  );
}