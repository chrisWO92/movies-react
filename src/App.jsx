import React from "react";
import { MovieDetails } from "./pages/MovieDetails"
import { LandingPage } from "./pages/LandingPage";
import styles from "./App.module.css";

import { Routes, Route, Link } from "react-router-dom";

/* export function App() {
  return (
    <div>
      <header>
        <h1 className={styles.title}>Movies</h1>
        <Link to="/">Home</Link>
        <br />
        <Link to="/movie">Movie</Link>
      </header>
      <main>
        <Routes>
          <Route path="/movie">Movie</Route>
          <Route path="/">Home</Route>
        </Routes>
        <MoviesGrid />
      </main>
      </div>
    
  );
} */

export function App() {
  return (
    <div className="App">
      <header>
        <Link to="/">
          <h1 className={styles.title}>Movies</h1>
        </Link>
      </header>
      
      {/* What I undestand is that this Routes doesnt appear in the screen,
      but they charge and redirect the element defined in it. If the current
      path we are viewing is "/" then the <LandingPage /> element will charge, 
      but if it's the "/movies/:movieId" then the <MovieDetails/> will charge.
      The "/movies/:movieId" is a dynamic path that detects any set of characters
      after "/movies/" and saves it into a variable called "movieId" */}

      <Routes>
        <Route exact path="/" element={<LandingPage/>} />
        <Route exact path="/movies/:movieId" element={<MovieDetails />} />
      </Routes>
    </div>
  );
}






