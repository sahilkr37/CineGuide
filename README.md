# CineGuide – AI Movie Guide

CineGuide is an AI-powered movie guide built with **React** and **Tailwind CSS**, designed to help users discover movies based on genres, moods, or personalized AI queries. Users can watch trailers, explore recommendations, and manage a wishlist.

---

## Features

- **User Authentication:** Login with Google or register using email (Firebase).
- **Homepage:** Browse movies by genres with instant trailer links (via TMDB API).
- **AI Movie Guide:** Add your Gemini API Key (stored locally) to get AI-powered movie suggestions using natural language queries.
  - _Examples:_
    - “Shah Rukh Khan romantic movies in the 90s”
    - “Lighthearted comedies for the weekend”
- **Wishlist:** Save movies to a personal list (backend integration in progress).
- **Smooth UX:** Shimmer UI for loading, caching API responses, and responsive design.

---

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **State Management:** Redux Toolkit
- **Authentication & Hosting:** Firebase
- **APIs:** TMDB API (movie data & trailers), Gemini AI (AI-powered suggestions)

---

## Installation

1.  **Clone the repository:**

    ```bash
    git clone [your-github-repo-link]
    cd cineguide
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Firebase Setup:**
    Add your Firebase configuration in `firebase.js`.

4.  **Start development server:**

    ```bash
    npm run dev
    ```

5.  Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🚀 Usage

1.  Log in with Google or register with email.
2.  Explore movies by genres on the homepage.
3.  To use AI suggestions:
    - Go to your profile and add your Gemini API Key (stored locally).
    - Enter a query in natural language (mood, actor, genre, era, etc.).
    - Get **10 movie suggestions with trailer links**.
4.  Add movies to your wishlist (backend integration coming soon).

---

## 🎥 Demo

- **Live Project:** [https://cineguide0.web.app/](https://cineguide0.web.app/)

---

## 🙌 Acknowledgements

- **Akshay Saini** – For his insightful courses explaining the “why” behind every concept.
- **TMDB API** – For providing movie data and trailers.
- **Gemini AI** – For AI-powered movie suggestions.

---

## 📜 License

This project is for **educational purposes** only.
