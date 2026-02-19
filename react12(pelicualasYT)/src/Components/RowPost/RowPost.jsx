import { useEffect, useState } from "react";
import "./RowPost.css";
import { getMoviesByCategory, getVideos } from "../../service/movie-service";
import YouTube from "react-youtube";
import { imageUrl } from "../../Constants/Constants";

export default function RowPost(props) {
  const [movies, setMovies] = useState([]);
  const [videoId, setVideoId] = useState("");
  const [error, setError] = useState(null);


    useEffect(() => {
      getMoviesByCategory(props.url).then((data) => {
        try {
          setMovies(data.results);
        } catch (e) {
          console.error(e);
          setError("Error loading movie");
        }
      });
    }, [props.url]);

    const opts = {
    height: "390",
    width: "100%",
    playerVars: { autoplay: 1 },
  };

  const handleOpen = async (id) => {
    try {
      const response = await getVideos(id);
      if (!response || !response.results) {
        setVideoId("");
        alert("No trailer available");
      } else {
        const trailer = response.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube",
        );

        if(trailer) {
          setVideoId(trailer.key);
        } else {
          setVideoId("");
          alert("No trailer available");
        }
      }
    } catch(e) {
      console.error(e);
    }
  };

  if(error) return <div>Error loading movies</div>;

  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={props.isSmall ? "smallPoster" : "poster"}
            src={`${imageUrl + movie.backdrop_path}`}
            alt={movie.title}
            onClick={() => handleOpen(movie.id)}
          />
        ))}
      </div>
        {videoId && <YouTube opts={opts} videoId={videoId}/>}
    </div>
  );
}
