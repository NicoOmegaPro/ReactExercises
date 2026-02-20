import styles from "./App.module.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

import { MovieDetails } from "./pages/MovieDetails";
import LandingPage from "./pages/LandingPage";

export default function App(){
  return(
    <Router>
      <header>
            <Link to="/">
               <h1 className={styles.title}>Movies de Nico</h1>
            </Link>
      </header>
      <main>
        <Routes>
          <Route path="/movies/:movieId2" element={<MovieDetails/>}/> //MovieCard manda el movieId2 con movie.id mas link, entonces como existe la url, se muestra "MovieDetails"
          <Route path="/" element={<LandingPage/>}/>
          <Route path="*" element={<Navigate replace to="/"/>}/>
        </Routes>
      </main>
    </Router>

  // <BrowserRouter>
  //   <App />
  // </BrowserRouter>
  )
}