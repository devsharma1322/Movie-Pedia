import "./css/App.css";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import NavBar from "./components/NavBar";
import MoviePage from "./pages/MoviePage";
import GenrePage from "./pages/GenrePage";

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/genre/:genreId" element={<GenrePage />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;