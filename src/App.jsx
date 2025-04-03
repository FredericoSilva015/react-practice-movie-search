import { useEffect, useState } from 'react';
import Search from './components/search';
import MovieCard from './components/MovieCard';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();

      setMovieList(data.results || []);
    } catch (error) {
      if (error instanceof SyntaxError) {
        setMovieList([]);
      }

      console.error(`Error fetching movies ${{ error }}`);
      setErrorMessage('Error fetching movies, please try again later');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper flex items-center flex-col bg-[url('/movie-theater-background-image.jpg')] bg-center bg-no-repeat bg-cover">
        <header className="max-w-5xl flex items-center flex-col">
          <h1 className="text-center text-3xl text-white mb-5">
            Find <span>Movies</span> You'll Enjoy With out the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          {/* <h1 className="text-white">{searchTerm}</h1> */}
        </header>
        <section className="w-full max-w-5xl">
          <h2 className="text-3xl text-white mb-5">All Movies</h2>
          <hr className="mb-5 border-white border-4" />
          {isLoading ? (
            <span className="loader"></span>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul className="grid grid-cols-4 gap-x-2.5 gap-y-2.5">
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
