import React from "react";
import { MoviesGrid } from "../components/MoviesGrid";
import { Search } from "../components/Search";
import { useDebounce } from "../hooks/useDebounce";
import { useQuery } from "../hooks/useQuery";

export function LandingPage() {
    /* El elemento LandingPage carga a su vez el elemento MoviesGrid
       que contiene la grilla con todas las películas que trae el json
       de la API */


    const query = useQuery();
    const search = query.get("search");

    /* Se usa el hook useDebounce para actualizar la grilla al cambiar el texto de búsqueda sin necesidad de presionar enter ni el ícono de la lupa. Se actualiza al pasar el tiempo especificado como parámetro, en este caso 300 milisegundos. Luego, a la key del MoviesGrid se le pasa el debouncedSearch en lugar del search sólo */

    const debouncedSearch = useDebounce(search, 300);

    return (
        <div>
            {/* Se carga la grilla y también una barra de búsqueda */}
            <Search />
            <MoviesGrid key={debouncedSearch} search={search}/>
        </div>
    );    
}