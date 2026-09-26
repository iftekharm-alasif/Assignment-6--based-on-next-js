"use client";

import type { ReactNode } from "react";
import { WorkoutProvider } from "@/context/WorkoutContext";

interface ProvidersProps {
  children: ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return <WorkoutProvider>{children}</WorkoutProvider>;
};

export default Providers;