import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import BookList from "../components/BookList";
import { searchBooks } from "../utils/booksApi";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  async function handleSearch(q) {
    setQuery(q);
    if (!q || q.trim() === "") {
      setBooks([]);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const results = await searchBooks(q);
      setBooks(results);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch books. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className="mt-3">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {["Bible","Devotionals","Theology","Christian Living"].map(cat => (
            <button
              key={cat}
              onClick={() => handleSearch(cat)}
              className="px-4 py-2 shrink-0 rounded-full text-sm font-medium bg-chip text-white"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <section className="mt-6">
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {!loading && books.length === 0 && query && (
          <p className="text-sm text-gray-500">No results for “{query}”</p>
        )}
        <BookList books={books} />
      </section>
    </div>
  );
}
