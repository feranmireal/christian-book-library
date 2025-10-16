import React from "react";

export default function ErrorMessage({ message = "An error occurred." }) {
  return (
    <div className="p-3 rounded-md bg-red-50 text-red-700 border border-red-100">
      {message}
    </div>
  );
}
