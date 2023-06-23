import { addDoc, collection, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/ja'; // 必要に応じてロケールを指定してください
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';



dayjs.extend(utc);
dayjs.extend(timezone);




function Search({selectedResultSetTitle, selectedSetTitle, selectedPrice, selectedSetPrice, selectedPostText2, selectedSetPostText2,selectedSingleImage, selectedSetSingleImage, selectedPrevPrice,  selectedSetPrevPrice  }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSearchResults, setSelectedSearchResults] = useState([]);


  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(query(collection(db, 'posts'), orderBy('createdAt', 'desc')));
      setSearchResults(data.docs.map((doc) => doc.data()));
    };
    getPosts();
  }, []);

  

  const handleSearch = () => {
    const results = searchResults.filter((doc) =>
      doc.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSelectedSearchResults(results);
  }

  const handleClick = (doc) => {
    selectedSetTitle(doc.title);
    selectedSetPrice(doc.price);
    selectedSetPrevPrice(doc.prevPrice);
    selectedSetPostText2(doc.postsText2);
    selectedSetSingleImage(doc.imgUrl);
  };

  const addToCart = async (doc) => {
    try {
      const cartItem = {
        title: doc.title,
        price: doc.price,
        postsText2: doc.postsText2,
        prevPrice: doc.prevPrice,
        imgUrl: doc.imgUrl1,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'cart'), cartItem);
      alert('カートに入れました');;
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const sortedResultsLists = selectedSearchResults.sort((a, b) => b.createdAt - a.createdAt);

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
    </div>
  </div>
</div>
</div>

<>
<div class="bg-white py-6 sm:py-8 lg:py-12 fade">
    <div class="mx-auto max-w-screen-2xl px-4 md:px-8 mb-10">


<div class="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
      
  {sortedResultsLists.map((doc) => (
    <div>
    <a href="#" class="group relative mb-2 block h-96 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3">
    <>
    <Link to="/"  
    // onClick={() => handleClick(doc)} 
    >
    <img src={doc.imgUrl1} loading="lazy" alt="Photo by Austin Wade" class="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
    </Link>
    </>
    
    <div class="absolute left-0 bottom-2 flex gap-2">
    <span class="rounded-r-lg bg-red-500 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">-50%</span>
    <span class="rounded-lg bg-white px-3 py-1.5 text-sm font-bold uppercase tracking-wider text-gray-800">New</span>
    </div>
    </a>
    
    <div class="flex items-start justify-between gap-2 px-2">
    <div class="flex flex-col">
    <a href="#" class="text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl">{doc.title}</a>
    <span class="text-gray-500">
    <div dangerouslySetInnerHTML={{ __html: doc.postsText2 }} />
    </span>
    </div>
    
    <div class="flex flex-col items-end">
    <span class="font-bold text-gray-600 lg:text-lg">{doc.price}円</span>
    <span class="text-sm text-red-500 line-through">{doc.prevPrice}円</span>
    <button onClick={() => addToCart(doc)}
    >カートに入れる</button>
  </div>
  </div>
  </div>
  ))}
      </div>
  </div>
  </div>

      </>
      </>
  );
}

export default Search;
