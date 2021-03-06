import React from "react";
import { useParams } from "react-router-dom";
import styles from "./MovieDetails.module.css";
import { useEffect } from "react";
import { get } from "../utils/httpClient";
import { useState } from "react";

/* We load this file to get details of the film. In this case this movie.json just has
the info about "Godzilla vs Kong" */


export function MovieDetails() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    useEffect(() => {
        get("/movie/" + movieId).then(data => {
            setMovie(data);
        })
    }, [movieId]);

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