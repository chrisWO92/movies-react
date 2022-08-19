import React from "react";
import { useParams } from "react-router-dom";
import styles from "./MovieDetails.module.css";
import { useEffect } from "react";
import { get } from "../utils/httpClient";
import { useState } from "react";
import { Spinner } from "../components/Spinner";


/* We load this file to get details of the film. In this case this movie.json just has
the info about "Godzilla vs Kong" */


export function MovieDetails() {

    const { movieId } = useParams();
    /* The useParams() hook catches the "movieId" parameter passed to the 'path="/movies/:movieId"' in the App.jsx file, so it can be used as a vairable in this code */

    const [movie, setMovie] = useState(null);
    /* useState es usado para crear un estado que será actualizado con el hook useEffect() del componente. En este caso se genera una variable movie igual a null, y la función setMovie que sirve para actualizar el valor de movie al parámetro que le sea pasado */

    const [isLoading, setIsLoading] = useState(true);
    /* Se crea otro seguidor de estado para la variable isLoading que en principio se setea en true. La idea es que si esta variable está en true, quiere decir que está cargando, y en ese caso se piensa mostrar una animación de carga, como un circulo dando vueltas o una barra de carga. */

   

    useEffect(() => {
        
        setIsLoading(true);
        /* Se comienza el useEffect() seteando la variable isLoading en true para que aparezca la animación de carga */

        get("/movie/" + movieId).then(data => {
            setMovie(data);
            setIsLoading(false);
            /* Cuando los datos están cargados, la animación se detiene */
        })
    }, [movieId]); 
    /* The "[ movieId ]" statement indicates the dependencies of the useEffect() hook. When "movieId" changes, the hook is executed */

    /* Si isLoading está en true, se carga el icono de carga, que en este caso será un Spinner giratorio */
    if (isLoading) {
        return <Spinner />;
    }
    /* At first, "movie" is set at null value with the "useState(null)" statement. It implies that the useEffect() hook will not be executed. Instead, the programm will move forward to the if() statement below, returning "null" taking into consideration that "movie" does not exist yet. Then te programm goes back to the useEffect() hook, getting into it, doing the promise and setting the data into the "movie" parameter */
    if (!movie) {
        return null;
    }

    const imageURL = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
    
    return (
        <div className={styles.detailsContainer}>
            <img className={`${styles.col} ${styles.movieImage}`} src={imageURL} alt={movie.title} />
            <div className={`${styles.col} ${styles.movieDetails}`}>
                <p className={styles.firstItem}><strong>Title:</strong> {movie.title}</p>
                {/*When we return genre.name without curly braces {} we are getting a string. So, we can use .join
                to get a string with alll the genres in the database file separated by coma in this case*/}
                <p>
                    <strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(", ")}
                </p>

                <p><strong>Description:</strong> {movie.overview}</p>
            </div>
        </div>
    );
}