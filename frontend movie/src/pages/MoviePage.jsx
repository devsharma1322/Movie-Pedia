import "../css/MoviePage.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMovieContext } from "../contexts/MovieContext";

const API_KEY = "b9869058a380d05a84528017811ce154";

function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [ott, setOTT] = useState([]);
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const [movieRes, creditsRes, videosRes, providersRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`),
          fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`),
          fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`),
          fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${API_KEY}`)
        ]);

        const movieData = await movieRes.json();
        const creditsData = await creditsRes.json();
        const videosData = await videosRes.json();
        const providersData = await providersRes.json();

        setMovie(movieData);
        setCast(creditsData.cast.slice(0, 6));
        setTrailer(videosData.results.find(v => v.type === "Trailer" && v.site === "YouTube"));
        setOTT(providersData.results?.IN?.flatrate || []);
      } catch (err) {
        console.error("Failed to fetch movie data", err);
      }
    };

    fetchMovieData();
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
            : "/fallback.jpg"
        }
        alt={movie.title || "No Title"}
      />

      <div className="movie-details">
        <h1>{movie.title}</h1>
        <p><strong>Release Date:</strong> {movie.release_date}</p>
        <p><strong>Rating:</strong> {movie.vote_average} / 10</p>
        <p><strong>Runtime:</strong> {movie.runtime} mins</p>
        <p><strong>Genres:</strong> {movie.genres?.map(g => g.name).join(", ")}</p>
        <p><strong>Overview:</strong> {movie.overview}</p>

        {trailer && (
          <a
            href={`https://www.youtube.com/watch?v=${trailer.key}`}
            target="_blank"
            rel="noreferrer"
            className="trailer-link"
          >
            🎬 Watch Trailer
          </a>
        )}

        {ott.length > 0 && (
          <div className="ott-platforms">
            <strong>Available on:</strong>
            <ul>
              {ott.map(provider => (
                <li key={provider.provider_id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                    alt={provider.provider_name}
                    title={provider.provider_name}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={() => favorite ? removeFromFavorites(movie.id) : addToFavorites(movie)}
          className={`favorite-toggle ${favorite ? "active" : ""}`}
        >
          {favorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>

        {cast.length > 0 && (
          <div className="cast-section">
            <h3>Cast</h3>
            <ul className="cast-list">
              {cast.map(actor => (
                <li key={actor.id}>
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : "https://via.placeholder.com/100x150"
                    }
                    alt={actor.name}
                  />
                  <p>{actor.name}</p>
                  <p className="character">as {actor.character}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default MoviePage;
