import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTitles, setFilteredTitles] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(query(collection(db, 'posts'), orderBy('createdAt', 'desc')));
      const titles = data.docs.map((doc) => doc.data().title);
      // setFilteredTitles(titles);
      setSearchResults(data.docs.map((doc) => doc.data()));
    };
    getPosts();
  }, []);

  // useEffect(() => {
  //   const filtered = filteredTitles.filter((title) =>
  //     title.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   setFilteredTitles(filtered);

  //   const results = searchResults.filter((doc) =>
  //     doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   setSearchResults(results);
  // }, [searchTerm]);

  const handleSearch = () => {
    // const filtered = filteredTitles.filter((title) =>
    //   title.toLowerCase().includes(searchTerm.toLowerCase())
    // );
    // setFilteredTitles(filtered);

    const results = searchResults.filter((doc) =>
      doc.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);

    
    // navigate('/');
  }

// function Search() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredTitles, setFilteredTitles] = useState([]);
//   const [displayedTitles, setDisplayedTitles] = useState([]);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const getPosts = async () => {
//       const data = await getDocs(query(collection(db, 'posts'), orderBy('createdAt', 'desc')));
//       setFilteredTitles(data.docs.map((doc) => doc.data().title));
//     };
//     getPosts();
//   }, []);

//   useEffect(() => {
//     const filtered = filteredTitles.filter((title) =>
//       title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setDisplayedTitles(filtered);
//   }, [searchTerm, filteredTitles]);

//   const handleSearch = () => {
//     const filtered = filteredTitles.filter((title) =>
//       title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setDisplayedTitles(filtered);
//     navigate("./searchresult")
//   };

  return (
    <>
    
<div class="bg-white py-6 sm:py-8 lg:py-12">
<div class="mx-auto max-w-screen-2xl px-4 md:px-8">
  <div class="flex flex-col items-center rounded-lg bg-gray-100 p-4 sm:p-8 lg:flex-row lg:justify-between">
    <div class="mb-4 sm:mb-8 lg:mb-0">
      <h2 class="text-center text-xl font-bold text-indigo-500 sm:text-2xl lg:text-left lg:text-3xl">Looking up record titles </h2>
    </div>

    <div class="flex flex-col items-center lg:items-end">
      <div class="mb-3 flex w-full max-w-md gap-2">
        <input   type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
         class="bg-gray-white w-full flex-1 rounded border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-400 outline-none ring-indigo-300 transition duration-100 focus:ring" />

        <button    onClick={() => handleSearch()} class="inline-block rounded bg-indigo-500 px-8 py-2 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">Search</button>
      </div>
      {searchTerm.length >= 3 && (
        <ul>
          {searchResults.map((doc) => (
            <li key={doc.id}>
                      <p>{doc.title}</p>
             
                      <p>{doc.price}</p>
                      <p>{doc.prevPrice}</p>
                      <p>{doc.postsText2}</p>
                 <img src={doc.imgUrl} />
                    </li>
            ))}
        </ul>
      )}
    </div>
  </div>
</div>
</div>
      </>
  );
}

export default Search;
