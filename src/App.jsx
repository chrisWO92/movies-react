import React from "react";
import { MovieDetails } from "./pages/MovieDetails"
import { MoviesGrid } from "./components/MoviesGrid";
import styles from "./App.module.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

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
      <h1 className={styles.title}>Welcome to React Router!</h1>
        <Link to="/movies">Movies</Link>
        <br />
        <Link to="/">Home</Link>
      </header>
      
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/movies" element={<MovieDetails />} />
        <Route path="/404" element={<Error />} />
      </Routes>
    </div>
  );
}

function Home() {
  return (
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      {/* <nav>
        <Link to="/movies">Movies</Link>
      </nav> */}
    </>
  );
}

function Movies() {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>That feels like an existential question, don't you think?</p>
      </main>
      {/* <nav>
        <Link to="/">Home</Link>
      </nav> */}
      <MoviesGrid />
    </>
  );
}

function Error() {
  return (
    <>
      <h1>404</h1>
    </>
  )
}


