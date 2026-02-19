import { useEffect, useState } from "react";
import { get } from "../utils/httpClient";
import { MovieCard } from "./MovieCard";
import styles from "./MoviesGrid.module.css";
import { Spinner } from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { Empty } from "./Empty";

export function MoviesGrid({search}){
    const[movies,setMovies] = useState([]);
    const[loading,setLoading] = useState(true);
    const[page, setPage] = useState(1);
    const[hasMore, setHasMore] = useState(true);

    useEffect(() => {
        setLoading(true);
        const searchUrl = search
            ? "/search/movie?query=" + search + "&page=" + page
            : "/discover/movie?page=" + page;
        get(searchUrl).then(data => {
            setMovies(prevMovies => prevMovies.concat(data.results));
            setHasMore(data.page < data.total_pages);
            setLoading(false);
        })
    },[search,page])

    if(!loading && movies.length == 0) return <Empty/>

    return(
        <InfiniteScroll
        dataLength={movies.length}
        next={() => setPage(prevPage  => prevPage+1)}
        hasMore={hasMore}
        loader={<Spinner/>}
        endMessage={
            <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
            </p>}
        >
            <ul className={styles.moviesGrid}>
                {movies.map(movie =>
                    <MovieCard key={movie.id} movie={movie}/>
                )}
            </ul>    
        </InfiniteScroll>
    )
}
