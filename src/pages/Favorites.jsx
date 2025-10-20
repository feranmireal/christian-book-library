import React from "react";
import useLocalStorage from "../utils/useLocalStorage";
import BookCard from "../components/BookCard";

export default function Favorites() {
  const [favorites] = useLocalStorage("favorites", []);
  return (
    <div className="pb-20">
      <h2 className="text-xl font-semibold mb-4">Favorites</h2>
      {favorites.length === 0 ? (
        <p className="text-gray-500">You have no favorite books yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {favorites.map(f => (
            <BookCard key={f.id} book={{
              id: f.id,
              title: f.title,
              authors: f.authors,
              thumbnail: f.thumbnail
            }} />
          ))}
        </div>
      )}
    </div>
  );
}
