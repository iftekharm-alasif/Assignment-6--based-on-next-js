"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Workout } from "@/types/workout";

interface WorkoutContextType {
  plan: Workout[];
  saved: Workout[];
  completed: number[];
  addToPlan: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  saveWorkout: (workout: Workout) => void;
  removeFromSaved: (id: number) => void;
  markAsDone: (id: number) => void;
  isCompleted: (id: number) => boolean;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
}

const WorkoutContext = createContext<
  WorkoutContextType | undefined
>(undefined);

export function WorkoutProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [completed, setCompleted] = useState<number[]>([]);

  // Track whether localStorage data has been loaded
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    const storedPlan = localStorage.getItem("fitlog-plan");
    const storedSaved = localStorage.getItem("fitlog-saved");
    const storedCompleted = localStorage.getItem("fitlog-completed");

    if (storedPlan) {
      const parsedPlan: Workout[] = JSON.parse(storedPlan);
      setPlan(parsedPlan);
    }

    if (storedSaved) {
      setSaved(JSON.parse(storedSaved));
    }

    if (storedCompleted) {
      setCompleted(JSON.parse(storedCompleted));
    }

    // Loading finished
    setIsLoaded(true);
  }, []);

  // Save plan after localStorage has loaded
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(plan)
    );
  }, [plan, isLoaded]);

  // Save saved workouts
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(saved)
    );
  }, [saved, isLoaded]);

  // Save completed workouts
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(
      "fitlog-completed",
      JSON.stringify(completed)
    );
  }, [completed, isLoaded]);

  // Add workout to today's plan
  const addToPlan = (workout: Workout) => {
    setPlan((currentPlan) => {
      if (currentPlan.length >= 5) {
        return currentPlan;
      }

      if (
        currentPlan.some(
          (item) => item.id === workout.id
        )
      ) {
        return currentPlan;
      }

      return [...currentPlan, workout];
    });
  };

  // Remove workout from today's plan
  const removeFromPlan = (id: number) => {
    setPlan((currentPlan) =>
      currentPlan.filter(
        (workout) => workout.id !== id
      )
    );
  };

  // Save workout
  const saveWorkout = (workout: Workout) => {
    setSaved((currentSaved) => {
      if (
        currentSaved.some(
          (item) => item.id === workout.id
        )
      ) {
        return currentSaved;
      }

      return [...currentSaved, workout];
    });
  };

  // Remove saved workout
  const removeFromSaved = (id: number) => {
    setSaved((currentSaved) =>
      currentSaved.filter(
        (workout) => workout.id !== id
      )
    );
  };

  // Mark workout as done
  const markAsDone = (id: number) => {
    setCompleted((currentCompleted) => {
      if (currentCompleted.includes(id)) {
        return currentCompleted;
      }

      return [...currentCompleted, id];
    });
  };

  // Check completed status
  const isCompleted = (id: number) => {
    return completed.includes(id);
  };

  // Check if workout is already in plan
  const isInPlan = (id: number) => {
    return plan.some(
      (workout) => workout.id === id
    );
  };

  // Check if workout is saved
  const isSaved = (id: number) => {
    return saved.some(
      (workout) => workout.id === id
    );
  };

  return (
    <WorkoutContext.Provider
      value={{
        plan,
        saved,
        completed,
        addToPlan,
        removeFromPlan,
        saveWorkout,
        removeFromSaved,
        markAsDone,
        isCompleted,
        isInPlan,
        isSaved,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error(
      "useWorkout must be used inside WorkoutProvider"
    );
  }

  return context;
}