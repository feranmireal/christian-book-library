import React from "react";
import { Link } from "react-router-dom";

function getThumbnail(book) {
  if (book.thumbnail) return book.thumbnail;
  if (book.volumeInfo?.imageLinks?.thumbnail) return book.volumeInfo.imageLinks.thumbnail;
  if (book.volumeInfo?.imageLinks?.smallThumbnail) return book.volumeInfo.imageLinks.smallThumbnail;
  return "";
}

export default function BookCard({ book }) {
  // Accept either normalized book object (from utils) or API raw shape
  const id = book.id || book.volumeInfo?.id;
  const title = book.title || book.volumeInfo?.title || "Untitled";
  const authors = book.authors || book.volumeInfo?.authors || [];
  const thumb = getThumbnail(book);

  return (
    <Link to={`/book/${id}`}>
      <div className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-md transition">
        <div className="h-44 bg-gray-100 rounded-xl overflow-hidden mb-3">
          {thumb ? (
            <img src={thumb} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
          )}
        </div>
        <h3 className="text-sm font-semibold leading-tight text-gray-800">{title}</h3>
        <p className="text-xs text-gray-500 mt-1">{(authors && authors.join(", ")) || "Unknown"}</p>
      </div>
    </Link>
  );
}
