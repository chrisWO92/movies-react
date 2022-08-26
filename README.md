# Movies React App

Este proyecto hace parte de mi plan personal de aprendizaje de React. En este documento estaré presentando el resumen de los conceptos puestos en práctica y los skills adquiridos con la misma.

## index.js

Se crea una aplicación de react.

La misma comienza por al redenrizado del archivo `index.js`, en el cual se crea un `<Router />` que renderiza el componente general `<App />`.

Tanto el archivo `index.js` como el componente `<App />` están en la carpeta **/src**.

### 1. Elemento `<App />` y librería `react-router-dom`

Si queremos usar la librería `react-router-dom`, siempre debemos encerrar nuestro árbol de dependencias dentro de un BrowserRouter, que llamamos en este caso **Router**. 

Permite el enrutamiento dinámico. Las rutas que se definan dentro del **Router** dependerán del path actual del navegador, y cargaran un elemento en particular dependiendo de este dato.

En este caso se carga el elemento `<LandingPage />` en caso que `path="\"`, y `<MovieDetails />` en caso que `path="/movies/:movieId"`, siendo **movieId** un identificador que se define para cualquier cadena de caracteres que venga después de la cadena **/movies/**. De esta manera se pueden cargar los detalles de una película enviando una consulta a la API con el identificador de una pelicula en particular sobre la cual se haga click. Hay que tener en cuenta que el componente `<MovieDetails />` se carga en la pantalla a partir del click que se le haga a cualquiera de las peliculas mostradas. `<LandingPage />` y `<MovieDetails />` se encuentra un nivel abajo en el arbol de carpetas, dentro de la carpeta **/src/pages**.

### 2. Elemento `<MoviesDetails />`

Es el componente que se renderiza cuando el usuario hace click sobre alguna de las cartas de las peliculas (las cuales también son un componente que se explicará más adelante). 

Se usan los siguientes hooks:

-`{ useParams } from "react-router-dom"`
-`{ useState } from "react"`
-`{ useEffect } from "react"`

#### 2.1.1. `{ useParams } from "react-router-dom"`

La sentencia `const { movieId } = useParams()` toma el valor de la variable **movieId** que se guardó de esa forma al establecerlo en el enrutamiento `<Route exact path="/movies/:movieId" element={<MovieDetails />} />`. Esta variable se usa en este componente para hacer una consulta a la API formando el **path="/movies/:movieId"**, y haciendo dicha consulta cada vez que se renderiza el componente `<MoviesDetails />, o cuando cambia la variable **movieId** (que puede ser escrita manualmente en el navegador sin tener que hacer click en ninguna tarjeta).

#### 2.1.2. `{ useState } from "react"`

Este hook se usa mediante el siguiente código: `const [variable, setVariable] = useState([])`. Esto es una destructuración de datos, la cual crea en la variable llamada **variable** un estado que será actualizado mediante la función guardada como **setVariable**. Posteriormente lo que se hace es activar `setVariable()` con una acción dentro que actualice a **variable**. 

De esa manera, `useState()` se usa siempre que se quiera crear un estado que se tenga que actualizar en relación a los eventos que sucedan en la página. Usualmente suele ponerse la función `setVariable()` dentro de la llamada al hook **useEffect**.

El arreglo vacío **[]** pasado como parámetro indica el estado inicial que le quiere dar a **variable**. Puede ser 0, un string vacío, la variable null, etc.

Se crean los siguientes estados:

-`const [movie, setMovie] = useState(null)`
-`const [isLoading, setIsLoading] = useState(true)`

La función **setMovie()** actualiza el valor de la variable **movie**, la cual tiene un valor inicial de *null*, y que es el arreglo de datos de las peliculas que llega desde la API. Por su parte, la función **setIsLoading()** actualiza la variable **isLoading** que le indica al componente si la aplicación se encuentra esperando la respuesta de la petición de los datos o si ya los ha recibido, para saber cuando mostrar en pantalla el spinner de carga.

#### 2.1.3. `{ useEffect } from "react"`

El hook **useEffect** permite ejecutar tareas secundarias dentro de nuestros componentes funcionales cuando suceden los siguientes eventos: cuando el componente es montado, cuando el componente sufre un cambio en su state o props, o cuando el componente es desmontado.

Dentro del llamado al **useEffect()** de este componente se llama a la función que llama a los datos de la pelicula seleccionada mediente la variable **movieId**. También se maneja la variable **isLoading** para mostrar u ocultar el spinner de carga. Se setea en *true* si se renderiza el componente o cuando cambia la variable **movieID** y se setea en *false* dentro del fetch que consulta a la API. Es decir, se deja de mostrar el spinner cuando se reciben los datos.

### 3. Elemento `<LandingPage />`

Este elemento carga dos componentes internos, el componente `<Search />` y el componente `<MoviesGrid />`, los cuales ya se encuentran dentro de la carpeta que contiene todos los demás componentes de la aplicación, **src/components**.

#### 2.1. `<Search />`

Este componente le permite al usuario ingresar una palabra clave para hacer una consulta a la API de peliculas. Usa la librería `react-icons/fa` para usar el componente `<FaSearch />` para generar un ícono de lupa de búsqueda, y los siguientes hooks:

-`{ useState } from "react"`
-`{ useEffect } from "react"`
-`{ useNavigate } from "react-router-dom"`
-`{ useQuery } from "../hooks/useQuery";`

#### 2.1.1. -`{ useState } from "react"`

Se crea el estado `const [searchText, setSearchText] = useState("")`

#### 2.1.2. `{ useEffect } from "react"`
