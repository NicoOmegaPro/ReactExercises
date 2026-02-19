import { useState } from "react";
import styles from "./Banner.module.css";
import { getMoviesByCategory, getVideos } from "../../service/movie-service";
import { useEffect } from "react";
import { imageUrl, trending } from "../../Constants/Constants";
import YouTube from "react-youtube";

export default function Banner() {
  const [movie, setMovie] = useState();
  const [videoId, setVideoId] = useState("");
  const [random, setRandom] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    getMoviesByCategory(trending).then((data) => {
      try {
        setRandom(Math.floor(Math.random() * data.results.length));
        setMovie(data.results[random]);
      } catch (e) {
        console.error(e);
        setError("Error loading movie");
      }
    });
  }, [random]);

  const opts = {
    height: "448",
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

        if (trailer) {
          setVideoId(trailer.key);
        } else {
          setVideoId("");
          alert("No trailer available");
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (error) return <div>Error loading movies</div>;

  return (
    <div
      style={{
        backgroundImage: `url(${movie ? imageUrl + movie.backdrop_path : ""})`,
      }}
      className={styles.banner}
    >
      {videoId && <YouTube opts={opts} videoId={videoId} />}
      <div className={styles.content}>
        <h1 className={styles.title}>{movie ? movie.title : ""}</h1>
        <div>
          <button
            onClick={() => handleOpen(movie.id)}
            className={styles.button}
          >
            Play
          </button>
          <button className={styles.button}>My List</button>
        </div>
        <h1 className={styles.description}>{movie ? movie.overview : ""}</h1>
        <div className={styles.fade_bottom}></div>
      </div>
    </div>
  );
}
