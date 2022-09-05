import React from "react";
import styles from "./Search.module.css";
import { FaSearch } from "react-icons/fa";
/* import { useEffect,  useState } from "react"; */
import { useNavigate } from "react-router-dom";
import { useQuery } from "../hooks/useQuery";

export function Search() {
  /*const [searchText, setSearchText] = useState(""); Se elimina esta instrucción pues el Search pasa a controlarse a través del onChange del input del search.

  /* Se pone el useQuery en el Search para crear un efecto que vigile los cambios en la variable search. Si hay un cambio en la variable search, se dará la instrucción mediante un efecto para que se actualice el valor del input para que quede vacío */
  const query = useQuery();
  const search = query.get("search");

  /* useEffect(() => {
      /* Si se pone sólo search en el paréntesis, al actualizar la ruta, el valor del input sigue siendo el valor de la búsqueda. En cambio, si se pone search || "" quiere decir que si el valor de search no existe, se debe setear la variable searchText en comilla vacía y con esto el input se estaría actualizando correctamente a vacío cuando no se estén haciendo una búsqueda
      setSearchText(search || "");
  }, [search]); 
  
  El efecto anterior se elimina porque el cambio del search ahora pasa a manejarse a través del onChange del input

  */

  /* El hook useNavigate se usa para actualizar el path en el que queremos ubicarnos. En el caso de abajo, se usa para que al hacer el submit del form, la ruta del navegador se actualice a una ruta configurada para posteriormente hacer una búsqueda en la API, que sería "/?search=" + searchText */
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    /*
    navigate("/?search=" + searchText);
    Se elimina porque esto pasa a actualizarse en el onChange del input
    */
  };

  return (
    <form className={styles.searchContainer} onSubmit={handleSubmit}>
      <div className={styles.searchBox}>
        {/* La propiedad value y el manejador onChange se usan para actualizar constantemente el valor del texto del input en la medida que lo vamos editando. Mediante la función setSearchText le asignamos a la propiedad value, el valor de la variable searchText, que se actualiza al valor qque trae consigo el evengo de cambio, que es e.target.value */}
        <input
          className={styles.searchInput}
          type="text"
          value={search}
          onChange={(e) => {
            const value = e.target.value;
            /*
            setSearchText(value);
            /* Se agrega la siguiente instrucción para que ante un cambio en el search, automáticamente la página empiece a cargar los elementos de la búsqueda 
            Se elimmina elñ setSearchText pues ahora esto se controla a través del value={search} */
            navigate("/?search=" + value)
          }}
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
