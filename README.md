# Clover

An anime discovery web app built with **React**. Browse top anime, search titles and sign in to your own account.

## Features

- **Browse:** top anime list from the public [Jikan API](https://jikan.moe), shown in an image carousel
- **Search:** search by title, with "Load More" pagination
- **Auth:** sign up and log in with a JWT token stored on the client
- **Protected UI:** profile menu and logout once you're signed in
- Loading spinners and a responsive layout

## Tech stack

React · React Router · Context API · React Slick · Fetch API · JWT auth

The auth backend (Node.js, Express, MongoDB) lives in a separate repo.

## Project structure

```
src/
├── components/
│   ├── auth/        # Login, Signup
│   ├── Context.js   # global state + data fetching
│   ├── Header.js    # nav, search, profile menu
│   ├── Carousel.js
│   └── ...          # item cards, buttons, footer, spinner
└── App.js           # routes: /, /login, /register
```

## Run locally

```bash
npm install
npm start
```

To use login and signup, create a `.env` file with the backend endpoint:

```
REACT_APP_LOGIN=<your-backend-url>/api/auth/login
```
