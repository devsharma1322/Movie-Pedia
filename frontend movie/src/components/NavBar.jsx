import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";

const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">MoviePedia</Link>

      <div className="nav-center">
        <Link to="/" className="nav-link">Home</Link>

        <div
          className="genre-dropdown"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <button className="genre-button">Genres</button>
          {isDropdownOpen && (
            <div className="dropdown-content">
              {genres.map((genre) => (
                <Link
                  key={genre.id}
                  to={`/genre/${genre.id}`}
                  state={{ genreName: genre.name }}
                  className="dropdown-item"
                >
                  {genre.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link to="/favorites" className="nav-link">Favorites</Link>
      </div>
    </nav>
  );
}
