import React from "react";
import BookCard from "./BookCard";

export default function BookList({ books }) {
  if (!books || books.length === 0) {
    return <p className="text-sm text-gray-500">No books found.</p>;
  }
  return (
    <div className="grid grid-cols-2 gap-4">
      {books.map(b => <BookCard key={b.id} book={b} />)}
    </div>
  );
}
