import { useState } from 'react';
import Search from './components/search';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <main className="bg-black flex items-center flex-col">
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <h1 className="text-3xl text-white">
            Find <span>Movies</span> You'll Enjoy With out the Hassle
          </h1>
        </header>
      </div>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <h1 className="text-white">{searchTerm}</h1>
    </main>
  );
};

export default App;
