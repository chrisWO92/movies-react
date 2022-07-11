import React from "react";
import { useEffect, useState } from "react";
import { get } from "../utils/httpClient";
import { MovieCard } from "./MovieCard";
import styles from "./MoviesGrid.module.css";

export function MoviesGrid() {
  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
      get("/discover/movie").then((data) => {
        setMovies(data.results);
      });
    }, []);
  return (
    <ul className={styles.moviesGrid}>
      {/*MoviesGrid is a CSS Grid. We use movies.map(movie) to apply return an element
      per each movie in the json file. MovieCard is the element returned and it's a
      <li></li> element. */}
      {movies.map((movie) => <MovieCard key={movie.id} movie={movie}/>)}
    </ul>
  );
}
