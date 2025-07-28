import "../css/GenrePage.css";
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

const API_KEY = "b9869058a380d05a84528017811ce154";

export default function GenrePage() {
  const { genreId } = useParams();
  const location = useLocation();
  const genreName = location.state?.genreName || "Genre"; // fallback title

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
        );
        const data = await res.json();
        setMovies(data.results || []);
      } catch (err) {
        console.error("Error fetching genre movies:", err);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    if (genreId) {
      fetchMoviesByGenre();
    }
  }, [genreId]);

  return (
    <div className="genre-container">
      <h1 className="genre-title">{genreName} Movies</h1>
      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : movies.length === 0 ? (
        <p className="no-movies">No movies found for this genre.</p>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
