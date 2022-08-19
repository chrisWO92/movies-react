import { useLocation } from "react-router-dom";

/* Se crea un hook personalizado, que depende del hook de react useLocation. Con esta función se retorna lo que se identifique como search en la ruta actual. Debe tenerse en cuenta que el hook useLocation retorna un array de objetos, uno de los cuales tiene la key "search", que lo identifica como "?search=bat", asumiendo que se escribió bat en la barra de búsqueda */
export function useQuery() {
  return new URLSearchParams(useLocation().search);
}
