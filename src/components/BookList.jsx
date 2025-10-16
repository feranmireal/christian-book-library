import React from "react";
import BookCard from "./BookCard";

export default function BookList({ books = [] }) {
  if (!books || books.length === 0) return null;
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {books.map(b => (
        <BookCard key={b.id} book={b} />
      ))}
    </div>
  );
}
