import React from "react";
import Game from "./Game";
import "./Card.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: ["card-container"],
      id: null,
      category: null,
      question: null,
      answer: null,
      questionAsked: false,
      allCategories: [],
      activeCategories: [],
      gameOver: false,
    };
  }

  componentDidMount() {
    Game.start();
    this.setState({ question: Game.question, answer: Game.answer });
    this.setState({ allCategories: Game.allCategories });
    this.setState({ activeCategories: Game.activeCategories });
  }

  handleClickAnswer() {
    this.setState({ classes: ["card-container", "flip"] });
  }
  handleClickCategory() {
    this.setState({ classes: ["card-container", "flip", "show_category"] });
  }
  handleClickBack() {
    if (this.state.classes.includes("show_category")) {
      //category to front
      this.setState({ gameOver: false});
      this.setState({ classes: ["card-container", "show_category"] });
      Game.getNextQuestion();
      setTimeout(() => {
        this.setState({ question: Game.question, answer: Game.answer });
      }, 300)
    } else {
      //answer to front
      this.setState({ classes: ["card-container"] });
      Game.getNextQuestion();
      setTimeout(() => {
        this.setState({ question: Game.question, answer: Game.answer });
      }, 300);
      if(Game.gameOver){
        this.setState({ gameOver: Game.gameOver});
      }
    }
  }
  //categories are not working with questions
  handleClickToggle(state, id) {
    if (state) {
      Game.removeCategory(id);
      this.setState({ activeCategories: Game.getActiveCategories() });
    } else {
      Game.addCategory(id);
      this.setState({ activeCategories: Game.getActiveCategories() });
    }
  }

  render() {
    return (
      <div className="App">
        <div className={this.state.classes.join(" ")}>
          <div className="card">
            <div className="front">
              <div className="text-xl mb-2">{this.state.question}</div>
              <div>{Game.gameOver ? "No more questions, update your categories to try again." : ""}</div>
              <button className="AnswerButton"
                disabled={this.state.gameOver}
                onClick={() => {
                  this.handleClickAnswer();
                }}
              >
                Show Answer
              </button>
              <button className="Button"
                onClick={() => {
                  this.handleClickCategory();
                }}
              >
                Show Categories
              </button>
            </div>
            <div className="back">
              {this.state.classes.includes("show_category") ? (
                <div>
                  <div className="text-xl">Categories</div>
                  <div className="toggles">
                  {this.state.allCategories.map((category, i) => {
                    const is_on = this.state.activeCategories.includes(
                      category.id
                    )
                      ? true
                      : false;
                    const toggle_class = `toggle ${is_on ? "on" : "off"}`;
                    return (
                      <div key={i}>
                        <div>{category.name}</div>
                        <div
                          onClick={() => {
                            this.handleClickToggle(is_on, category.id);
                          }}
                          className={toggle_class}
                        >
                          {" "}
                        </div>
                      </div>
                    );
                  })}
                  </div>
                </div>
              ) : null}
              {!this.state.classes.includes("show_category") ? (
                <div className="text-xl mb-2">{this.state.answer}</div>
              ) : null}
              <button className="Button"
                onClick={() => {
                  this.handleClickBack();
                }}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
