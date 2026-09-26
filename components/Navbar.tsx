"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWorkout } from "@/context/WorkoutContext";

const Navbar = () => {
  const pathname = usePathname();

  const { plan, saved } = useWorkout();

  return (
   <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#111111]/95 backdrop-blur">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between px-5 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/logo.png"
            alt="FitLog Logo"
            width={32}
            height={32}
            priority
          />

          <span className="text-2xl font-black tracking-tight text-white">
            FITLOG
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className={`text-sm font-bold uppercase tracking-wider transition ${
              pathname === "/"
                ? "text-[#ccff00]"
                : "text-white/60 hover:text-white"
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`text-sm font-bold uppercase tracking-wider transition ${
              pathname === "/my-plan"
                ? "text-[#ccff00]"
                : "text-white/60 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* Status Badges */}
        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="rounded-full bg-[#ccff00] px-4 py-2 text-xs font-black uppercase tracking-wide text-black"
          >
            Plan {plan.length}
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full border border-white/30 px-4 py-2 text-xs font-black uppercase tracking-wide text-white"
          >
            Saved {saved.length}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
