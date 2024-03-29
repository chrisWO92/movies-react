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

-`{ useParams } from "react-router-dom"`\
-`{ useState } from "react"`\
-`{ useEffect } from "react"`

#### 2.1.1. `{ useParams } from "react-router-dom"`

La sentencia `const { movieId } = useParams()` toma el valor de la variable **movieId** que se guardó de esa forma al establecerlo en el enrutamiento `<Route exact path="/movies/:movieId" element={<MovieDetails />} />`. Esta variable se usa en este componente para hacer una consulta a la API formando el **path="/movies/:movieId"**, y haciendo dicha consulta cada vez que se renderiza el componente `<MoviesDetails />, o cuando cambia la variable **movieId** (que puede ser escrita manualmente en el navegador sin tener que hacer click en ninguna tarjeta).

#### 2.1.2. `{ useState } from "react"`

Este hook se usa mediante el siguiente código: `const [variable, setVariable] = useState([])`. Esto es una destructuración de datos, la cual crea en la variable llamada **variable** un estado que será actualizado mediante la función guardada como **setVariable**. Posteriormente lo que se hace es activar `setVariable()` con una acción dentro que actualice a **variable**. 

De esa manera, `useState()` se usa siempre que se quiera crear un estado que se tenga que actualizar en relación a los eventos que sucedan en la página. Usualmente suele ponerse la función `setVariable()` dentro de la llamada al hook **useEffect**.

El arreglo vacío **[]** pasado como parámetro indica el estado inicial que le quiere dar a **variable**. Puede ser 0, un string vacío, la variable null, etc.

Se crean los siguientes estados:

-`const [movie, setMovie] = useState(null)`\
-`const [isLoading, setIsLoading] = useState(true)`

La función **setMovie()** actualiza el valor de la variable **movie**, la cual tiene un valor inicial de *null*, y que es el arreglo de datos de las peliculas que llega desde la API. Por su parte, la función **setIsLoading()** actualiza la variable **isLoading** que le indica al componente si la aplicación se encuentra esperando la respuesta de la petición de los datos o si ya los ha recibido, para saber cuando mostrar en pantalla el spinner de carga.

#### 2.1.3. `{ useEffect } from "react"`

El hook **useEffect** permite ejecutar tareas secundarias dentro de nuestros componentes funcionales cuando suceden los siguientes eventos: cuando el componente es montado, cuando el componente sufre un cambio en su state o props, o cuando el componente es desmontado.

Dentro del llamado al **useEffect()** de este componente se llama a la función que llama a los datos de la pelicula seleccionada mediente la variable **movieId**. También se maneja la variable **isLoading** para mostrar u ocultar el spinner de carga. Se setea en *true* si se renderiza el componente o cuando cambia la variable **movieID** y se setea en *false* dentro del fetch que consulta a la API. Es decir, se deja de mostrar el spinner cuando se reciben los datos.

### 3. Elemento `<LandingPage />`

Este elemento carga dos componentes internos, el componente `<Search />` y el componente `<MoviesGrid />`, los cuales ya se encuentran dentro de la carpeta que contiene todos los demás componentes de la aplicación, **src/components**.

#### 3.1. `<Search />`

Este componente le permite al usuario ingresar una palabra clave para hacer una consulta a la API de peliculas. Usa la librería `react-icons/fa` para usar el componente `<FaSearch />` para generar un ícono de lupa de búsqueda, y los siguientes hooks:

-`{ useState } from "react"`\
-`{ useEffect } from "react"`\
-`{ useNavigate } from "react-router-dom"`\
-`{ useQuery } from "../hooks/useQuery"`

#### 3.1.1. -`{ useState } from "react"`

Se crea el estado `const [searchText, setSearchText] = useState("")` para actualizar y manejar el texto que se encuentra dentro del input de búsqueda.

La actualización mediente la función **setSearchText()** se hace una vez dentro del **useEffect()**, en el cualse actualiza la variable **searchText** con la variable **search**, que se obtiene de usar el hook **useQuery()**.

También se hace otra actualización mediante la detección del evento **onChange={}** del input, en el cual se convoca la función **setSearchText()** y se actualiza **searchText** con el valor que detecta el evento: **e.target.value**.

#### 3.1.2. `{ useEffect } from "react"`

El hook **useEffect()** en este componente se activa cuando se renderiza, y cuando cambia la variable **search** que es el valor del input. 

#### 3.1.3. `{ useNavigate } from "react-router-dom"`

El hook **useNavigate()** se usa para actualizar el path en el que queremos ubicarnos. En este componente se usa para que al hacer el submit del form, la ruta del navegador se actualice a una ruta configurada para posteriormente hacer una búsqueda en la API, que sería **"/?search=" + searchText**. Es como un **useState()** que aplica sólo a la ruta del navegador. Se actualiza mediante el evento *onSubmit* del form del componente.

#### 3.1.4. `{ useQuery } from "../hooks/useQuery"`

Se crea un hook personalizado, que depende del hook de react **useLocation()**. Con esta función se retorna lo que se identifique como **search** en la ruta actual. Debe tenerse en cuenta que el hook **useLocation()** retorna un array de objetos, uno de los cuales tiene la key **search**, que lo identifica como **?search=bat**, asumiendo que se escribió *bat* en la barra de búsqueda.

Lo que retorna el hook personalizado **useQuery()** se guarda en una variable, y luego mediante el método **get()** se obtiene lo que se identifique como **search**. Mientras que el `useLocation().search` arroja **?search=bat**, `useQuery().get("search")` arroja sólo **bat**.

Con esta cadena de texto escrita en el input del form, se hace la consulta a la API cuando se activa el **useEffect()**, que se ejecuta cuando cambia la variable **search** y también cuando se actualiza la página de la consulta (este dato sirve para hacer el InfiniteScroll).

#### 3.1.5. Últimas consideraciones componente Search

El form tiene un manejador de submit que actualiza la ruta del navegador mediante el hook **useNavigate()**. 

En el input tiene un evento **onChange={}** que permite usar la función **setSearchText()** para actualizar constantemente el valor de la variable search, y por medio del parámetro **value** también del input, que se iguala a la variable **search**, se mantiene este valor actualizado todo el tiempo.


#### 3.1. `<MoviesGrid />`

El componente `<MoviesGrid />` es el que se encarga de mostrar todas las peliculas en la pantalla, ya sean los traidos por default en la primera página de los datos de la API, o aquellos obtenidos por realizar una consulta en el buscador.

El **useEffect()** de este componente define la variable **searchURL** a partir de un operador ternario que depende de las caracteristicas de la variable **search**. Si esta variable está definida, entonces crea una ruta de consulta para la API de cierta manera que traiga sólo las peliculas relacionadas a la palabra clave, con su respectivo número de página. Pero si no existe esa variable le ruta que se define es distinta y está destinada a hacer una consulta default de la API en la que trae las peliculas más habladas del momento, también con un número de página que se irá actualizando en la medida que se va haciendo scroll y se van cargando nuevas peliculas. Esta funcionalidad se explicará en detalle y de manera particular.

Dentro de la función que hace la consulta a la API, se define la función **setMovies()** para que al llegar los datos, se agreguen a los datos que ya se tenían anteriormente, agregando debajo de las peliculas mostradas actualmente, la siguiente página de información cargada. 

Vale la pena resaltar que el **fetch()** ejecuta en su interior uns sentencia que permite hacer esta concatenación. 

El efecto se ejecuta vigilando las variables **search** y **page**.

Para la carga de varias páginas, este componente usa una librería llamada `react-infinite-scroll-component`, que permite crear el componente `<InfiniteScrollComponent />`. Este componente recibe varios parámetros, como el tamaño del array de datos que necesita cargar, si hay más páginas para cargar o no, permite definir un "loader" para mostrarlo mientras se cargan los datos, y también recibe la función "next" dentro de la cual se usa la función **setPage()** en la cual se agrega uno al número de la página actual para enviarle ese número al **useEffect()**, el cual se ejecutará cuando vea que la variable **page** sufrió un cambio.

Posteriormente se observa que el set de datos **movies** se mapea para generar una `<MovieCarg />` por cada pelicula.

### 4. `<MovieCard />`

Este componente no es más que la tarjeta que se mostrará por cada uno de las peliculas cargadas y mapeadas del set **movies**. 

Como se observa, la tarjeta toda se encuentra dentro de un componente `<Link />` ya que debe redirigir a una página nueva donde se cargará un componente `<MovieDetails />`, a través de la ruta `<Link to={"/movies/" + movie.id}>`.

### 5. `<Spinner />`

Se usa una librería de iconos para react llamada `react-icons/fa`, y se implementa un spinner, el cual se hace girar con CSS usando una simple animación infinita.