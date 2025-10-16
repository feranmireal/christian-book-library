import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  function submit(e) {
    e.preventDefault();
    onSearch(value);
  }

  return (
    <form onSubmit={submit} className="w-full">
      <label htmlFor="search" className="sr-only">Search</label>
      <div className="flex gap-2">
        <input
          id="search"
          className="flex-1 rounded-xl px-4 py-3 bg-white border focus:ring-2 focus:ring-primary outline-none"
          placeholder="Search for Christian Books"
          value={value}
          onChange={(e)=> setValue(e.target.value)}
        />
        <button type="submit" className="px-4 py-3 rounded-xl bg-primary text-white">Search</button>
      </div>
    </form>
  );
}
