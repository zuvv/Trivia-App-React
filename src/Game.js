import Trivia_Data from "./data.json";

class Game {
  constructor() {
    this.id = "";
    this.category = "";
    this.question = "";
    this.answer = "";
    //this.allQuestions = Trivia_Data.trivia;
    this.allCategories = [];
    this.activeCategories = ["H"];
    this.activeQuestions = [];
    this.gameOver = false;
  }

  reset() {
    this.id = "";
    this.category = "";
    this.question = "";
    this.answer = "";
    //this.allQuestions = Trivia_Data.trivia;
    this.activeQuestions = this.setActiveQuestions();
  }

  //start games
  start() {
    this.reset();
    this.activeCategories = this.getActiveCategories();
    this.activeQuestions = this.setActiveQuestions();
    this.allCategories = Trivia_Data.categories;
    this.getNextQuestion();
  }
  getNextQuestion() {
    if (this.activeQuestions.length === 0) {
      this.gameOver = true;
      this.id = "";
      this.category = "";
      this.question = "";
      this.answer = "";
    } else {
      this.gameOver = false;
      let randomQuestion = this.getRandomQuestion();
      //sets current values to the random question
      this.id = randomQuestion.id;
      this.categoryID = randomQuestion.categoryID;
      this.question = randomQuestion.question;
      this.answer = randomQuestion.answer;
      //console.log(this.getActiveQuestions());
      //remove question from list of active questions
      this.removeQuestion(this.id);
    }
  }

  removeQuestion(id) {
    const index = this.activeQuestions.findIndex(
      (question) => question.id === id
    );
    this.activeQuestions.splice(index, 1);
  }

  getActiveQuestions() {
    return this.activeQuestions;
  }
  setActiveQuestions() {
     return Trivia_Data.trivia.filter((question) =>
       this.activeCategories.includes(question.categoryID)
     );
  }
  //this will get a random question within the active categories
  getRandomQuestion() {
    let activeQuestions = this.getActiveQuestions();
    if (activeQuestions.length) {
      return activeQuestions[
        Math.floor(Math.random() * activeQuestions.length)
      ];
    }
  }
  addCategory(id) {
    this.activeCategories.push(id);
    this.activeQuestions = this.setActiveQuestions();
  }
  removeCategory(id) {
    this.activeCategories = this.activeCategories.filter((category) => {
      return category !== id;
    });
    this.activeQuestions = this.setActiveQuestions();
  }
  getActiveCategories() {
    return this.activeCategories;
  }
}

export default new Game();
