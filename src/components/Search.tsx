import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface SearchResult {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;
}

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selected, setSelected] = useState<string>('');

  const handleSearch = useCallback(async () => {
    if (query.length > 3) {
      try {
        const response = await axios.get<SearchResult[]>(
          'http://localhost:8081/api/weather/search',
          {
            params: { cityName: query },
          }
        );
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching search results', error);
      }
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSelect = (name: string) => {
    setSelected(name);
    setResults([]);
  };

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <div className='relative w-full max-w-md mx-auto mt-5'>
      <input
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='w-full p-2 border border-gray-300 rounded'
        placeholder='Search...'
      />
      {results.length > 0 && (
        <ul className='absolute z-10 w-full bg-white border border-gray-300 rounded shadow-md'>
          {results.map((result) => (
            <li key={result.name}>
              <button
                className='w-full p-2 text-left hover:bg-gray-100'
                onClick={() => handleSelect(result.name)}
              >
                {result.name}
              </button>
            </li>
          ))}
        </ul>
      )}
      {selected && <div className='mt-2 text-lg'>Selected: {selected}</div>}
    </div>
  );
};

export default Search;
