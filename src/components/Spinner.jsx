import React from "react";
import { FaSpinner } from 'react-icons/fa';
import styles from "./Spinner.module.css";

/* Para hacer uso de un ícono para el spinner, se instala una dependencia con npm llamada react-icons. 
   Para visualizar todos los recursos que tenemos para instalar con npm, podemos ir a la página
   npmjs.com. Allí se puede encontrar la dependencia React Icons y aparecen los pasos para instalación
   y uso*/

export function Spinner() {
    return (
        <div className={styles.spinner}>
            <FaSpinner className={styles.spinning} size={60}/>
        </div>
    )
}