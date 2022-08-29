import React from "react";
import { useEffect, useState } from "react";
import { get } from "../utils/httpClient";
import { MovieCard } from "./MovieCard";
import { Spinner } from "../components/Spinner";
import styles from "./MoviesGrid.module.css";
import { useQuery } from "../hooks/useQuery";
import InfiniteScroll from "react-infinite-scroll-component";

export function MoviesGrid( {search} ) {
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


  /* We create a state to update the page, using "1" as the default value of the page variable */
  const [ page, setPage ] = useState(1);

  /* We create a state to set the hasMore parameter in the InfiniteScroll component */
  const [ hasMore, setHasMore ] = useState(true);

  /* Lo que retorna el hook personalizado useQuery se guarda en una variable, y luego mediante el método get se obtiene lo que se identifique como search. Mientras que el useLocation().search arroja "?search=bat", useQuery().get("search") arroja sólo "bat" */
  /* Las sentencias de abajo se terminan comentando ya que la variable search y el uso del hook useQuery se implementan en el componente padre LandingPage, y allí se le pasa al componente MoviesGrid un parámetro search creado a partir del hook (de la misma forma que aquí), y se captura del otro lado, dentro del MoviesGrid, parar usarse en la lógica de ese componente. */
  /*const query = useQuery();
  const search = query.get("search");*/

  useEffect(() => {
    setIsLoading(true);

    /* Se crea la variable searchURL con un condicional ternario. Si el parámetro search existe, el path que va a la función get() para hacer el fetch será un patch de búsqueda, pero si no existe se hace el fetch con un path genérico que trae todas las películas para rellenar la grilla */
    const searchURL = search
      ? "/search/movie?query=" + search + "&page=" + page
      : "/discover/movie?page=" + page;
    get(searchURL).then((data) => {
      /* Instead of using setMovies(data.results), we use setMovies((prevMovies) => prevMovies.concat(data.results)), becuase we need to add the previous movies array, that is related to page 1, to the movies array related to the second page, and so on */
      setMovies((prevMovies) => prevMovies.concat(data.results));
      setHasMore(data.page < data.total_pages);
      setIsLoading(false);
    });

    /* Antes el useEffect() no tenía arreglo de dependencias, aparecía []. Ahora se configura para que la actualización se haga cada vez que se recarga la página y también cada vez que la variable search cambie, y esta a su vez depende de si se hace una búsqueda o no */
    /* We add "page" to the dependecies array of the useEffect() hook, to make the actions inside when the page variable changes. */
  }, [search, page]);

  /* Se muestra el spinner en caso que isLoading esté seteado en true */
  /* We comment this code because the Spinner component is being loaded when the useEffect() is activated. Instead of this we use the "loader" parameter in the InfiniteScroll component */
  /* if (isLoading) {
    return <Spinner />;
  } */

  return (
    <InfiniteScroll
      /* The next parameters of the InfiniteScroll component are those that come with the installation for it. This component lets us create an infinite scroll, and it needs de length of the data we are showing in the actual screen. We need to know that the API we're using gives us the information about the movies in pages, and it shows by default the first of these pages. But there are a lot of pages and we can show them all with this component. 
      The hasMore parameter lets us tell the component if there are more pages to show. It will turn into false when we reach the last page.
      The next parameter let us define the actions we're taking when the component loads the next page. In this case we create a state that updates the page where we are. The prevPage parameter we're passing to the setPage function is the same parameter "page" of the useState() we've created. We just add 1 to the page number to show the next page of the API.*/
      dataLength={movies.length} 
      hasMore={true} 
      next={() => setPage((prevPage) => prevPage + 1)}
      loader={<Spinner />}
    >
      <ul className={styles.moviesGrid}>
        {/*MoviesGrid is a CSS Grid. We use movies.map(movie) to apply return an element
      per each movie in the json file. MovieCard is the element returned and it's a
      <li></li> element. */}
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </ul>
    </InfiniteScroll>
  );
}
