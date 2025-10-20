import React from "react";

export default function CategoryChips({ onSelect }) {
  const cats = ["Bible", "Devotionals", "Theology", "Christian Living"];
  return (
    <div className="flex gap-3 mt-3 overflow-x-auto pb-2">
      {cats.map(c => (
        <button
          key={c}
          onClick={() => onSelect?.(c)}
          className="px-4 py-2 rounded-full chip text-sm shrink-0"
        >
          {c}
        </button>
      ))}
    </div>
  );
}
