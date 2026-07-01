import React, { useState, useCallback, useRef } from "react";
import { CategoryToggle } from "./CategoryToggle";
import { GameOver } from "./GameOver";
import type { Category } from "../types";
import styles from "./FlipCard.module.css";

interface Props {
  question: string;
  answer: string | number;
  gameOver: boolean;
  allCategories: Category[];
  activeCategories: string[];
  onNext: () => void;
  onToggleCategory: (id: string, isOn: boolean) => void;
}

type View = "question" | "answer" | "categories";

export function FlipCard({
  question,
  answer,
  gameOver,
  allCategories,
  activeCategories,
  onNext,
  onToggleCategory,
}: Props) {
  const [view, setView] = useState<View>("question");
  const [backView, setBackView] = useState<"answer" | "categories">("answer");
  const cardRef = useRef<HTMLDivElement>(null);

  const showAnswer = useCallback(() => {
    setBackView("answer");
    setView("answer");
  }, []);

  const showCategoriesView = useCallback(() => {
    setBackView("categories");
    setView("categories");
  }, []);

  const handleBack = useCallback(() => {
    setView("question");
    const card = cardRef.current;
    if (!card) return;
    const onFlipDone = () => {
      onNext();
      card.removeEventListener("transitionend", onFlipDone);
    };
    card.addEventListener("transitionend", onFlipDone);
  }, [onNext]);

  const isFlipped = view === "answer" || view === "categories";
  const showCategories = backView === "categories";

  const containerClass = [
    styles.container,
    isFlipped ? styles.flip : "",
    showCategories ? styles.showCategory : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClass}>
      <div className={styles.card} ref={cardRef}>
        <div className={styles.front}>
          <p className={styles.questionText}>{question}</p>
          {gameOver && <GameOver />}
          <button
            className={styles.primaryButton}
            disabled={gameOver}
            onClick={showAnswer}
            aria-label="Show answer"
          >
            Show Answer
          </button>
          <button
            className={styles.button}
            onClick={showCategoriesView}
            aria-label="Show categories"
          >
            Show Categories
          </button>
        </div>

        <div className={styles.back}>
          {showCategories ? (
            <CategoryToggle
              allCategories={allCategories}
              activeCategories={activeCategories}
              onToggle={onToggleCategory}
            />
          ) : (
            <p className={styles.answerText}>{answer}</p>
          )}
          <button className={styles.button} onClick={handleBack}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
