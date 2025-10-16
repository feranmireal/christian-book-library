import React from "react";
import { Link } from "react-router-dom";

function getThumbnail(book) {
  if (book.volumeInfo?.imageLinks?.thumbnail) return book.volumeInfo.imageLinks.thumbnail;
  if (book.volumeInfo?.imageLinks?.smallThumbnail) return book.volumeInfo.imageLinks.smallThumbnail;
  return "";
}

export default function BookCard({ book }) {
  const thumb = getThumbnail(book);
  const title = book.volumeInfo?.title || "Untitled";
  const authors = book.volumeInfo?.authors?.join(", ") || "Unknown";

  return (
    <Link to={`/book/${book.id}`}>
      <div className="bg-white rounded-xl p-2 shadow-sm hover:shadow-md transition">
        <div className="h-40 bg-gray-100 rounded-md overflow-hidden mb-2">
          {thumb ? <img src={thumb} alt={title} className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>}
        </div>
        <div>
          <h3 className="text-sm font-semibold leading-tight">{title}</h3>
          <p className="text-xs text-gray-500 mt-1">{authors}</p>
        </div>
      </div>
    </Link>
  );
}
