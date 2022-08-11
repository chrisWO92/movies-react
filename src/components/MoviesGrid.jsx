import React from "react";
import { useEffect, useState } from "react";
import { get } from "../utils/httpClient";
import { MovieCard } from "./MovieCard";
import { Spinner } from "../components/Spinner";
import styles from "./MoviesGrid.module.css";
import { useLocation } from "react-router-dom";

/* Se crea un hook personalizado, que depende del hook de react useLocation. Con esta función se retorna lo que se identifique como search en la ruta actual. Debe tenerse en cuenta que el hook useLocation retorna un array de objetos, uno de los cuales tiene la key "search", que lo identifica como "?search=bat", asumiendo que se escribió bat en la barra de búsqueda */
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function MoviesGrid() {
  /* useState hook works creating an array, being the first element of this array
     the set of data that we want to update from the API, and the second element
     will be the function that let us update that data inside the first element. 
     We just give each element a name to make it easier for us to use them in our
     code. */
  const [movies, setMovies] = useState([]);

  /* De la misma forma que el componente MovieDetails, el componente MoviesGrid deberá llevar el spinner cuando esté cargando la página de la grillas de las peliculas. */
  const [isLoading, setIsLoading] = useState(true);

  /* The useEffect hook is made to do an action when a secondary effect happens.
     For example, when the element render for the first time or when it is updated.
     In this case, when a secondary effect happens, the set of data contained in the
     movies array is updated, catching the data that comes from the API and that is called
     with the get(path) function. */

  /*  */

  /* Lo que retorna el hook personalizado useQuery se guarda en una variable, y luego mediante el método get se obtiene lo que se identifique como search. Mientras que el useLocation().search arroja "?search=bat", useQuery().get("search") arroja sólo "bat" */
  const query = useQuery();
  const search = query.get("search");

  useEffect(() => {
    setIsLoading(true);

    /* Se crea la variable searchURL con un condicional ternario. Si el parámetro search existe, el path que va a la función get() para hacer el fetch será un patch de búsqueda, pero si no existe se hace el fetch con un path genérico que trae todas las películas para rellenar la grilla */
    const searchURL = search
      ? "/search/movie?query=" + search
      : "/discover/movie";
    get(searchURL).then((data) => {
      setMovies(data.results);
      setIsLoading(false);
    });

    /* Antes el useEffect() no tenía arreglo de dependencias, aparecía []. Ahora se configura para que la actualización se haga cada vez que se recarga la página y también cada vez que la variable search cambie, y esta a su vez depende de si se hace una búsqueda o no */
  }, [search]);

  /* Se muestra el spinner en caso que isLoading esté seteado en true */
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ul className={styles.moviesGrid}>
      {/*MoviesGrid is a CSS Grid. We use movies.map(movie) to apply return an element
      per each movie in the json file. MovieCard is the element returned and it's a
      <li></li> element. */}
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </ul>
  );
}
