"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API_KEY = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYmVjNjg5ZjgxNzI4ZmNhZTk3YjVhMzA3ZmI5MDY1ZiIsIm5iZiI6MTc0ODg5MDkxMC4yNjcsInN1YiI6IjY4M2RmNTFlOTk0ZTgxMjZiZTdiYWQ1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hX6v3Osd5za6V2f6erPhFHxshgkcwhjhPcA1aZpMt38";

async function fetchPopularMovies() {
  const res = await fetch('https://api.themoviedb.org/3/movie/popular', {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: API_KEY
    },
    cache: 'no-store'
  });
  if (!res.ok) throw new Error("Error al obtener películas");
  return res.json();
}

async function fetchMovieDetails(id) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?append_to_response=credits`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: API_KEY
    },
    cache: 'no-store'
  });
  if (!res.ok) throw new Error("Error al obtener detalles de la película");
  return res.json();
}

export default function MovieExplorer() {
  const [movies, setMovies] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  // Cargar películas populares al montar
  useEffect(() => {
    fetchPopularMovies().then(data => setMovies(data.results.slice(0, 6)));
  }, []);

  // Cargar detalles cuando cambia el id seleccionado
  useEffect(() => {
    if (selectedId) {
      setLoading(true);
      fetchMovieDetails(selectedId)
        .then(data => {
          setSelectedMovie(data);
          setLoading(false);
        });
    }
  }, [selectedId]);

  return (
    <div className="flex min-h-screen gap-8 p-8">

      {/* Panel izquierdo: Detalles */}
      
      <div className="w-1/2 bg-white/80 rounded-lg shadow-lg p-6 flex flex-col items-center">
        {!selectedMovie && <div className="text-gray-500">Selecciona una película</div>}
        {loading && <div>Cargando detalles...</div>}
        {selectedMovie && !loading && (
          <>
            <h1 className="text-2xl font-bold mb-2 text-black">{selectedMovie.title}</h1>
            <img
              src={`https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
              className="w-60 rounded shadow-md mb-4"
            />
            <p className="mb-2 text-gray-700">{selectedMovie.overview}</p>
            <div className="mb-2 text-sm text-gray-600">
              <strong>Géneros:</strong> {selectedMovie.genres.map(g => g.name).join(", ")}
            </div>
            <div className="mb-2 text-sm text-gray-600">
              <strong>Fecha de estreno:</strong> {selectedMovie.release_date}
            </div>
            <div className="mb-2 text-sm text-gray-600">
              <strong>Duración:</strong> {selectedMovie.runtime} min
            </div>
            <div className="mb-2 text-sm text-gray-600 flex flex-col items-start">
              <strong>Reparto:</strong>
              <div className="flex gap-2 mt-2">
                {selectedMovie.credits?.cast?.slice(0, 5).map(actor => (
                  <div key={actor.id} className="flex flex-col items-center w-20">
                    {actor.profile_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w185/${actor.profile_path}`}
                        alt={actor.name}
                        className="w-16 h-16 object-cover rounded-full mb-1 border"
                      />
                    )}
                    {!actor.profile_path && (
                      <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center mb-1 text-xs">
                        Sin foto
                      </div>
                    )}
                    <span className="text-xs text-black text-center">{actor.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      {/* Panel derecho: Lista de películas */}
      <div className="w-1/2 flex flex-wrap justify-center items-start gap-8">
        {movies.map((movie) => (
          <button
            key={movie.id}
            onClick={() => setSelectedId(movie.id)}
            className={`w-60 bg-white rounded-lg shadow-lg flex flex-col items-center p-4 hover:shadow-2xl transition-shadow duration-300 border-2 ${
              selectedId === movie.id ? "border-blue-600" : "border-transparent"
            }`}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-72 object-cover rounded-md"
            />
            <h2 className="text-lg font-bold mt-4 text-black text-center">{movie.title}</h2>
          </button>
        ))}
      </div>
    </div>
  );
}