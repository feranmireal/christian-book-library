import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import BookDetail from "./pages/BookDetail";
import Favorites from "./pages/Favorites";
import About from "./pages/About";

export default function App() {
  return (
    <div className="min-h-screen pb-20">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-4 py-4">
          <Link to="/" className="text-2xl header-title text-primary">Christian Book Library</Link>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="max-w-xl mx-auto px-4 py-2 flex justify-between">
          <Link to="/" className="flex flex-col items-center text-sm text-gray-600">
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h3m10-11v11a1 1 0 001 1h3"/></svg>
            Home
          </Link>
          <Link to="/favorites" className="flex flex-col items-center text-sm text-gray-600">
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" d="M4.318 6.318A4.5 4.5 0 0112 10.5 4.5 4.5 0 0119.682 6.318C20.88 7.516 21.5 9 21.5 10.5c0 3.866-3.582 7.25-9 11C6.582 17.75 3 14.366 3 10.5 3 9 3.62 7.516 4.818 6.318z"/></svg>
            Favorites
          </Link>
          <Link to="/about" className="flex flex-col items-center text-sm text-gray-600">
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M12 22a10 10 0 110-20 10 10 0 010 20z"/></svg>
            About
          </Link>
        </div>
      </nav>
    </div>
  );
}
