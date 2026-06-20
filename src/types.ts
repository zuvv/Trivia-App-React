export interface Question {
  id: string;
  categoryID: string;
  question: string;
  answer: string | number;
}

export interface Category {
  id: string;
  name: string;
}

export interface GameState {
  question: string;
  answer: string | number;
  activeCategories: string[];
  allCategories: Category[];
  gameOver: boolean;
}
