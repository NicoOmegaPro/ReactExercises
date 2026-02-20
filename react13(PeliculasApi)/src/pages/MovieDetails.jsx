import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Spinner } from "../components/Spinner";
import { getMovieImg } from "../utils/getMovieImg";
import { get } from "../utils/httpClient";
import styles from "./MovieDetails.module.css";

export function MovieDetails(){
    const[movie,setMovie] = useState(null);
    const[loading,setLoading] = useState(true);
    const{movieId2} = useParams();

    useEffect(() => {
        setLoading(true);

        get("/movie/"+movieId2).then(data => {
            setMovie(data);
            setLoading(false);
        })        
    },[movieId2]);

    if(loading) return <Spinner/>;

    const imageUrl = getMovieImg(movie.poster_path,500);

    return(
        <div className={styles.detailsContainer}>
            <img className={`${styles.col} ${styles.movieImage}`}
                src={imageUrl}
                alt={movie.title}/>
            <div className={`${styles.col} ${styles.movieDetails}`}>
                <p className={styles.firstItem}><strong>Title:</strong> {" "+movie.title}</p>
                <p><strong>Genres:</strong> {" "}{movie.genres.map(genre => genre.name).join(", ")}</p>
                <p><strong>Description:</strong>{" "+movie.overview}</p>
            </div>
        </div>
    )

}