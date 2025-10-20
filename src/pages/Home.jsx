import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import CategoryChips from "../components/CategoryChips";
import BookList from "../components/BookList";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { searchBooks } from "../utils/booksApi";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function doSearch(q) {
    setQuery(q);
    if (!q || q.trim() === "") {
      setBooks([]);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await searchBooks(q);
      setBooks(res);
    } catch (err) {
      setError("Failed to fetch books. Try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pb-24">
      <SearchBar onSearch={doSearch} />
      <CategoryChips onSelect={doSearch} />

      <section className="mt-5">
        <h2 className="text-lg font-semibold mb-3">Featured Books</h2>
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {!loading && <BookList books={books} />}
      </section>
    </div>
  );
}
