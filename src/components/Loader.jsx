import React from "react";

export default function Loader() {
  return (
    <div className="py-8 flex justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
}
