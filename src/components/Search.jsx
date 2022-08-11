import React from "react";
import styles from "./Search.module.css";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Search() {
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/?search=" + searchText);
  };

  return (
    <form className={styles.searchContainer} onSubmit={handleSubmit}>
      <div className={styles.searchBox}>
        {/* La propiedad value y el manejador onChange se usan para actualizar constantemente el valor del texto del input en la medida que lo vamos editando. Mediante la función setSearchText le asignamos a la propiedad value, el valor de la variable searchText, que se actualiza al valor qque trae consigo el evengo de cambio, que es e.target.value */}
        <input
          className={styles.searchInput}
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {/* El evento click no se pone directamente dentro del button porque este se encuentra dentro de un form.
                    Cuando un button se encuentra dentro de un form, el envío de la información del form mediante el button se
                    maneja mediante un evento onSubmit directamente en el form */}
        <button className={styles.searchButton} type="submit">
          <FaSearch size={20} />
        </button>
      </div>
    </form>
  );
}
