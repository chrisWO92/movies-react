import React from 'react';
import { MoviesGrid } from "./components/MoviesGrid";
import styles from "./App.module.css"

import {
  Routes,
  Route,
  Link
} from "react-router-dom";

/* export function App() {
    return (
        <div>
            <header>
                <h1 className={styles.title}>Movies</h1>
            </header>
            <main>
                <MoviesGrid />
            </main>
        </div>
    );
} */

export function App() {
    return (
      <div className="App">
        <h1 className={styles.title}>Welcome to React Router!</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
        </Routes>
        <MoviesGrid />
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
        <nav>
          <Link to="/about">Home</Link>
        </nav>
      </>
    );
}

function About() {
    return (
      <>
        <main>
          <h2>Who are we?</h2>
          <p>
            That feels like an existential question, don't you
            think?
          </p>
        </main>
        <nav>
          <Link to="/">About</Link>
        </nav>
      </>
    );
}