import React from "react";
import { useEffect, useState } from "react";
import { get } from "../utils/httpClient";
import { MovieCard } from "./MovieCard";
import { Spinner } from "../components/Spinner";
import styles from "./MoviesGrid.module.css";

export function MoviesGrid() {

  /* useState hook works creating an array, being the first element of this array
     the set of data that we want to update from the API, and the second element
     will be the function that let us update that data inside the first element. 
     We just give each element a name to make it easier for us to use them in our
     code. */
  const [movies, setMovies] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true);

  /* The useEffect hook is made to do an action when a secondary effect happens.
     For example, when the element render for the first time or when it is updated.
     In this case, when a secondary effect happens, the set of data contained in the
     movies array is updated, catching the data that comes from the API and that is called
     with the get(path) function. */
  useEffect(() => {
    setIsLoading(true);
      get("/discover/movie").then((data) => {
        setMovies(data.results);
        setIsLoading(false);
      });
    }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ul className={styles.moviesGrid}>
      {/*MoviesGrid is a CSS Grid. We use movies.map(movie) to apply return an element
      per each movie in the json file. MovieCard is the element returned and it's a
      <li></li> element. */}
      {movies.map((movie) => <MovieCard key={movie.id} movie={movie}/>)}
    </ul>
  );
}
