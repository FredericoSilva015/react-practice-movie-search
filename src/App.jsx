import { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';
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
  const [isLoading, setIsLoading] = useState(true);
  const [debounceSearchTerm, setDebounceSearchTerm] = useState('');

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');

    const endpoint = query
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

    fetch(endpoint, API_OPTIONS)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const data = response.json();
        return data;
      })
      .then((data) => setMovieList(data.results || []))
      .catch((e) => {
        console.error(`Error fetching movies ${{ e }}`);
        setErrorMessage('Error fetching movies, please try again later');
      })
      .finally(() => setIsLoading(false));
  };

  // debounce the query for 800ms
  useDebounce(() => setDebounceSearchTerm(searchTerm), 800, [searchTerm]);

  useEffect(() => {
    fetchMovies(debounceSearchTerm);
  }, [debounceSearchTerm]);

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
        <section className="w-full max-w-5xl min-h-[2437px]">
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
