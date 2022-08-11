import React from "react";
import { MoviesGrid } from "../components/MoviesGrid";
import { Search } from "../components/Search";

export function LandingPage() {
    /* El elemento LandingPage carga a su vez el elemento MoviesGrid
       que contiene la grilla con todas las películas que trae el json
       de la API */
    return (
        <div>
            <Search />
            <MoviesGrid />
        </div>
    );    
}