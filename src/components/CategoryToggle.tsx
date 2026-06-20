import React from "react";
import type { Category } from "../types";
import styles from "./CategoryToggle.module.css";

interface Props {
  allCategories: Category[];
  activeCategories: string[];
  onToggle: (id: string, isOn: boolean) => void;
}

export function CategoryToggle({ allCategories, activeCategories, onToggle }: Props) {
  return (
    <div>
      <div className={styles.title}>Categories</div>
      <div className={styles.toggles}>
        {allCategories.map((category) => {
          const isOn = activeCategories.includes(category.id);
          return (
            <div key={category.id} className={styles.toggleRow}>
              <div>{category.name}</div>
              <button
                role="switch"
                aria-checked={isOn}
                aria-label={`Toggle ${category.name}`}
                onClick={() => onToggle(category.id, isOn)}
                className={`${styles.toggle} ${isOn ? styles.on : styles.off}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
