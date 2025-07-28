import "../css/MoviePage.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMovieContext } from "../contexts/MovieContext";

const API_KEY = "b9869058a380d05a84528017811ce154";

function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
      const data = await res.json();
      setMovie(data);
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <div className="loading">Loading...</div>;

  const favorite = isFavorite(movie.id);

  return (
    <div className="movie-page">
      <img
        className="movie-banner"
        src={
            movie.backdrop_path
            ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
            : "/fallback.jpg" // Use a placeholder image in public folder
        }
        alt={movie.title || "No Title"}
      />

      <div className="movie-details">
        <h1>{movie.title}</h1>
        <p><strong>Release Date:</strong> {movie.release_date}</p>
        <p><strong>Rating:</strong> {movie.vote_average} / 10</p>
        <p><strong>Overview:</strong> {movie.overview}</p>
        <button
          onClick={() => favorite ? removeFromFavorites(movie.id) : addToFavorites(movie)}
          className={`favorite-toggle ${favorite ? "active" : ""}`}
        >
          {favorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
}

export default MoviePage;
