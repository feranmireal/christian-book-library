import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookById } from "../utils/booksApi";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import useLocalStorage from "../utils/useLocalStorage";

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useLocalStorage("favorites", []);

  useEffect(() => {
    setLoading(true);
    getBookById(id).then(b => {
      setBook(b);
      setLoading(false);
    }).catch(() => {
      setError("Could not load the book.");
      setLoading(false);
    });
  }, [id]);

  function addToFavorites() {
    if (!book) return;
    if (favorites.find(f => f.id === book.id)) return;
    setFavorites([...favorites, { id: book.id, title: book.title, authors: book.authors, thumbnail: book.thumbnail }]);
  }

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!book) return <p>Book not found.</p>;

  return (
    <div className="pb-20">
      <button onClick={() => navigate(-1)} className="mb-4 text-sm text-gray-700">← Back</button>

      <h1 className="text-xl font-semibold mb-3 text-center">{book.title}</h1>

      <div className="w-full rounded-xl overflow-hidden mb-4">
        {book.thumbnail ? (
          <img src={book.thumbnail} alt={book.title} className="w-full h-56 object-cover rounded-xl" />
        ) : (
          <div className="h-56 bg-gray-100 rounded-xl" />
        )}
      </div>

      <div className="text-center mb-4">
        <p className="font-medium">{book.authors?.join(", ") || "Unknown Author"}</p>
        <p className="text-sm text-gray-500">{book.publisher} • {book.publishedDate}</p>
      </div>

      <p className="text-sm leading-relaxed mb-6">{book.description || "No description available."}</p>

      <button onClick={addToFavorites} className="w-full py-3 rounded-xl bg-chip text-white font-medium">
        Add to Favourites
      </button>
    </div>
  );
}
