import React from "react";
import styles from "./MovieDetails.module.css";

/* We load this file to get details of the film. In this case this movie.json just has
the info about "Godzilla vs Kong" */
import movie from "./movie.json";

export function MovieDetails() {
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