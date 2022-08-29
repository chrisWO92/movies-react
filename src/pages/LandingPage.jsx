import React from "react";
import { MoviesGrid } from "../components/MoviesGrid";
import { Search } from "../components/Search";
import { useQuery } from "../hooks/useQuery";

export function LandingPage() {
    /* El elemento LandingPage carga a su vez el elemento MoviesGrid
       que contiene la grilla con todas las películas que trae el json
       de la API */


    const query = useQuery();
    const search = query.get("search");

    return (
        <div>
            {/* Se carga la grilla y también una barra de búsqueda */}
            <Search />
            <MoviesGrid key={search} search={search}/>
        </div>
    );    
}