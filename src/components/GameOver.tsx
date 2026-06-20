import React from "react";
import styles from "./GameOver.module.css";

export function GameOver() {
  return (
    <p className={styles.message}>
      No more questions — update your categories to try again.
    </p>
  );
}
