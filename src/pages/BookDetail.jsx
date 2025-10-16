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
    getBookById(id).then(res => {
      setBook(res);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setError("Failed to load book.");
      setLoading(false);
    });
  }, [id]);

  function addToFavorites() {
    if (!book) return;
    const already = favorites.find(f => f.id === book.id);
    if (already) return;
    setFavorites([ ...favorites, { id: book.id, title: book.title, authors: book.authors, thumbnail: book.thumbnail } ]);
  }

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  if (!book) return <p>Book not found.</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)} className="mb-4">← Back</button>

      <h1 className="text-2xl font-semibold mb-4">{book.title}</h1>

      <div className="w-full rounded-xl overflow-hidden mb-4">
        <img src={book.thumbnail || ""} alt={book.title} className="w-full object-cover" />
      </div>

      <div className="text-center mb-4">
        <p className="font-medium">{book.authors?.join(", ") || "Unknown Author"}</p>
        <p className="text-sm text-gray-500">{book.publisher} • {book.publishedDate}</p>
      </div>

      <p className="text-sm leading-relaxed mb-6">{book.description || "No description available."}</p>

      <button onClick={addToFavorites} className="w-full py-3 rounded-xl bg-accent text-white">
        Add to Favourites
      </button>
    </div>
  );
}
