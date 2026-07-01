import { useState, useCallback } from "react";
import triviaData from "./data.json";
import type { Question, Category, GameState } from "./types";

const allCategories: Category[] = triviaData.categories;
const allQuestions: Question[] = triviaData.trivia as Question[];

function filterQuestions(activeCategories: string[]): Question[] {
  return allQuestions.filter((q) => activeCategories.includes(q.categoryID));
}

function pickRandom<T>(arr: T[]): T | null {
  return arr.length ? arr[Math.floor(Math.random() * arr.length)] : null;
}

const DEFAULT_CATEGORIES = ["H"];

export function useGame() {
  const [activeCategories, setActiveCategories] =
    useState<string[]>(DEFAULT_CATEGORIES);
  const [askedIds, setAskedIds] = useState<Set<string>>(() => new Set());
  const [current, setCurrent] = useState<Question | null>(() =>
    pickRandom(filterQuestions(DEFAULT_CATEGORIES))
  );

  const nextQuestion = useCallback(() => {
    if (!current) return;
    const updatedAsked = new Set(askedIds);
    updatedAsked.add(current.id);
    setAskedIds(updatedAsked);
    const pool = filterQuestions(activeCategories).filter(
      (q) => !updatedAsked.has(q.id)
    );
    setCurrent(pickRandom(pool));
  }, [current, askedIds, activeCategories]);

  const toggleCategory = useCallback(
    (id: string, isOn: boolean) => {
      const updatedCategories = isOn
        ? activeCategories.filter((c) => c !== id)
        : [...activeCategories, id];
      setActiveCategories(updatedCategories);

      const pool = filterQuestions(updatedCategories).filter(
        (q) => !askedIds.has(q.id)
      );
      const currentStillValid =
        current && pool.some((q) => q.id === current.id);
      if (!currentStillValid) {
        setCurrent(pickRandom(pool));
      }
    },
    [activeCategories, askedIds, current]
  );

  const state: GameState = {
    question: current?.question ?? "",
    answer: current?.answer ?? "",
    activeCategories,
    allCategories,
    gameOver: current === null,
  };

  return { state, nextQuestion, toggleCategory };
}
