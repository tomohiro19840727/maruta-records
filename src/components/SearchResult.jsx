import React from 'react'

const SearchResult = ({ searchResults }) => {
  return (
    <>
    {searchResults.map((doc) => (
      <li key={doc.id}>
        <p>{doc.title}</p>
        <p>{doc.price}</p>
        <p>{doc.prevPrice}</p>
        <p>{doc.postsText2}</p>
        <img src={doc.imgUrl} alt="Product" />
      </li>
    ))}
    </>
  )
}

export default SearchResult