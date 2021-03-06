import React from "react";
import styles from "./MovieCard.module.css";
import { Link } from "react-router-dom";

export function MovieCard({ movie }) {
  const imageURL = "https://image.tmdb.org/t/p/w300" + movie.poster_path;
  return (
    <li className={styles.movieCard}>
      <Link to={"/movies/" + movie.id}>
        <img
          width={230}
          height={345}
          className={styles.movieImg}
          src={imageURL}
          alt={movie.title}
        />
        <div className={styles.title}>{movie.title}</div>
      </Link>
    </li>
  );
}
