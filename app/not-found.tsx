import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0d0d0d] px-5">
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#ccff00]">
          FitLog
        </p>

        <h1 className="mt-4 text-8xl font-black text-white">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold uppercase text-white">
          Workout Not Found
        </h2>

        <p className="mx-auto mt-4 max-w-md text-white/50">
          The page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-[#ccff00] px-6 py-3 font-bold uppercase text-black"
        >
          Back to Workouts
        </Link>
      </div>
    </main>
  );
}