

import Link from "next/link";

async function getPopularMovies() {
  const res = await fetch('https://api.themoviedb.org/3/movie/popular', {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYmVjNjg5ZjgxNzI4ZmNhZTk3YjVhMzA3ZmI5MDY1ZiIsIm5iZiI6MTc0ODg5MDkxMC4yNjcsInN1YiI6IjY4M2RmNTFlOTk0ZTgxMjZiZTdiYWQ1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hX6v3Osd5za6V2f6erPhFHxshgkcwhjhPcA1aZpMt38'
    },
    cache: 'no-store'
  });

  if (!res.ok) throw new Error("Error al obtener películas");

  return res.json();
}

export default async function Home() {
  const movie = await getPopularMovies();

  return (
    <div className="flex flex-wrap justify-center items-center min-h-screen gap-8">
      {movie.results.slice(0, 6).map((movie) => (
        <Link
          key={movie.id}
          href={`/imagenes/${movie.id}`}
          className="w-72 bg-white rounded-lg shadow-lg flex flex-col items-center p-4 hover:shadow-2xl transition-shadow duration-300"
        >
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-80 object-cover rounded-md"
          />
          <h2 className="text-lg font-bold mt-4 text-black text-center">{movie.title}</h2>
        </Link>
      ))}
    </div>
  );
}