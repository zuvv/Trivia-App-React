# Trivia App Built in React 🧠

A trivia flashcard app built with React and TypeScript. Questions are stored in a JSON file and drawn randomly — no question is asked twice per session.

🔗 [Live Demo](https://zuvv.github.io/Trivia-App-React/)

---

## Features

- 150 trivia questions across 4 categories: History, Science, Riddles, Star Trek
- 3D flip card UI — click to reveal the answer
- Toggle categories on/off to filter questions
- Game over state when all questions in active categories are exhausted

---

## Tech Stack

- React 18 (functional components + hooks)
- TypeScript
- CSS Modules
- Jest + React Testing Library

---

## Project Structure

```
src/
├── App.tsx                  # Root component
├── useGame.ts               # Custom hook — all game logic
├── types.ts                 # TypeScript interfaces
├── data.json                # 150 trivia questions
└── components/
    ├── FlipCard.tsx         # 3D flip card UI
    ├── CategoryToggle.tsx   # Category on/off switches
    └── GameOver.tsx         # End state message
```

---

## Getting Started

```bash
npm install
npm start
```

To run tests:

```bash
npm test
```

---

## Deploying to GitHub Pages

1. Add homepage to `package.json`:
```json
"homepage": "https://zuvv.github.io/Trivia-App-React/"
```

2. Build and deploy:
```bash
npm run build
git checkout -b public
git add -A
git commit -m "Build"
git subtree push --prefix build origin public
```

3. In GitHub Settings → Pages, set the source to the `public` branch, root folder.
