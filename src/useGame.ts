import { useState, useCallback } from "react";
import triviaData from "./data.json";
import type { Question, Category, GameState } from "./types";

const allCategories: Category[] = triviaData.categories;
const allQuestions: Question[] = triviaData.trivia as Question[];

function filterQuestions(activeCategories: string[]): Question[] {
  return allQuestions.filter((q) => activeCategories.includes(q.categoryID));
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const DEFAULT_CATEGORIES = ["H"];

export function useGame() {
  const [activeCategories, setActiveCategories] =
    useState<string[]>(DEFAULT_CATEGORIES);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>(() =>
    filterQuestions(DEFAULT_CATEGORIES)
  );
  const [current, setCurrent] = useState<Question | null>(() => {
    const pool = filterQuestions(DEFAULT_CATEGORIES);
    return pool.length ? pickRandom(pool) : null;
  });
  const [gameOver, setGameOver] = useState(false);

  const advance = useCallback(
    (pool: Question[], currentId: string | undefined) => {
      const remaining = pool.filter((q) => q.id !== currentId);
      setActiveQuestions(remaining);
      if (remaining.length === 0) {
        setGameOver(true);
        setCurrent(null);
      } else {
        setGameOver(false);
        setCurrent(pickRandom(remaining));
      }
    },
    []
  );

  const nextQuestion = useCallback(() => {
    advance(activeQuestions, current?.id);
  }, [advance, activeQuestions, current]);

  const toggleCategory = useCallback(
    (id: string, isOn: boolean) => {
      const updated = isOn
        ? activeCategories.filter((c) => c !== id)
        : [...activeCategories, id];
      setActiveCategories(updated);
      const newPool = filterQuestions(updated);
      setActiveQuestions(newPool);
      setGameOver(newPool.length === 0);
    },
    [activeCategories]
  );

  const state: GameState = {
    question: current?.question ?? "",
    answer: current?.answer ?? "",
    activeCategories,
    allCategories,
    gameOver,
  };

  return { state, nextQuestion, toggleCategory };
}
