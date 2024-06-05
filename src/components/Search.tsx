import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { SearchResult } from '../types/type';

interface SearchProps {
  onLocationSelect: (result: SearchResult) => void;
}

const Search: React.FC<SearchProps> = ({ onLocationSelect }) => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = useCallback(async () => {
    if (query.length > 2) {
      try {
        setLoading(true);
        const response = await axios.get<SearchResult[]>(`${process.env.BASE_URL}/weather/search`, {
          params: { cityName: query },
        });
        setResults(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching search results', error);
        setLoading(false);
      }
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSelect = (result: SearchResult) => {
    onLocationSelect(result);
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
      {loading && (
        <div className='absolute top-0 right-0 mt-2 mr-2'>
          <svg
            className='animate-spin h-7 w-7 mr-3 text-blue-500'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0117.709 5.99L19.1 4.6A10 10 0 002.6 19.1l1.4-1.4z'
            ></path>
          </svg>
        </div>
      )}
      {results.length > 0 && (
        <ul className='absolute z-10 w-full bg-white border border-gray-300 rounded shadow-md'>
          {results.map((result) => (
            <li key={result.name}>
              <button
                className='w-full p-2 text-left hover:bg-gray-100'
                onClick={() => handleSelect(result)}
              >
                {result.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
