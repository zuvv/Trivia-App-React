# Trivia App Built in React 🧠
Welcome to my Trivia App, crafted with React! 🚀
All the intriguing questions are curated and stored in a CSV file, then transformed into a JSON format.
https://zuvv.github.io/Trivia-App-React/

## Getting Started
Initial start of the app shows History.
Updating the category resets the Questions.
All questions are selected randomly and questions are not asked twice.

### Instructions for Updating the Public Branch with Build File
1. Create a new branch: git checkout -b public
2. Allow the build files in .gitignore in the public branch
3. Commit your changes: git commit -am "Enable build inclusion"
4. Install dependencies: npm install
5. Build your project: npm run build
6. Add your changes: git add -A
7. Push the changes to the public branch: git subtree push --prefix build origin public

### Publishing to GitHub Pages
1. Go to "Settings" (it looks like a gear icon).
2. Find and click on "Pages" (it looks like a book).
3. Choose the "public" branch as the main one.
4. Set the main folder as the root.
5. Don't forget to save your changes.

## HomePage Addition
Don't forget to add your homepage URL to your `package.json`:
```json
"homepage": "https://zuvv.github.io/Trivia-App-React/"
