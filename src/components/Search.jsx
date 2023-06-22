import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../firebase';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTitles, setFilteredTitles] = useState([]);
  const [displayedTitles, setDisplayedTitles] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(query(collection(db, 'posts'), orderBy('createdAt', 'desc')));
      setFilteredTitles(data.docs.map((doc) => doc.data().title));
    };
    getPosts();
  }, []);

  useEffect(() => {
    const filtered = filteredTitles.filter((title) =>
      title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDisplayedTitles(filtered);
  }, [searchTerm, filteredTitles]);

  const handleSearch = () => {
    const filtered = filteredTitles.filter((title) =>
      title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDisplayedTitles(filtered);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleSearch}
        className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2"
      >
        Search
      </button>
      {searchTerm.length >= 3 && (
        <ul>
          {displayedTitles.map((title) => (
            <li key={title}>{title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
