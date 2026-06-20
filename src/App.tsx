import React from "react";
import { FlipCard } from "./components/FlipCard";
import { useGame } from "./useGame";
import styles from "./App.module.css";

export default function App() {
  const { state, nextQuestion, toggleCategory } = useGame();

  return (
    <div className={styles.app}>
      <FlipCard
        question={state.question}
        answer={state.answer}
        gameOver={state.gameOver}
        allCategories={state.allCategories}
        activeCategories={state.activeCategories}
        onNext={nextQuestion}
        onToggleCategory={toggleCategory}
      />
    </div>
  );
}
