import React from "react";
import { Link } from "react-router-dom";

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around py-2">
      <Link to="/" className="flex flex-col items-center text-sm">
        <span>🔺</span>
        Home
      </Link>
      <Link to="/favourites" className="flex flex-col items-center text-sm">
        <span>🤍</span>
        Favourites
      </Link>
      <Link to="/about" className="flex flex-col items-center text-sm">
        <span>ℹ️</span>
        About
      </Link>
    </div>
  );
};

export default BottomNav;
