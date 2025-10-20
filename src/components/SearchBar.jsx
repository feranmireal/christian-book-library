import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  function submit(e) {
    e?.preventDefault();
    if (onSearch) onSearch(value.trim());
  }

  return (
    <form onSubmit={submit} className="mt-2">
      <div className="flex items-center bg-gray-200 rounded-full px-3 py-2 max-w-md mx-auto">
        {/* 🔒 Force icon size with inline style to override everything */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ width: "20px", height: "20px", flexShrink: 0 }}
          className="text-gray-500 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>

        <input
          className="bg-transparent flex-1 outline-none text-sm text-gray-800 placeholder-gray-500"
          placeholder="Search for Christian Books"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <button
          type="submit"
          className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-sm"
        >
          Search
        </button>
      </div>
    </form>
  );
}
