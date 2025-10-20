import axios from "axios";

const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY || "";
const BASE = "https://www.googleapis.com/books/v1";

function normalize(item) {
  const v = item.volumeInfo || {};
  return {
    id: item.id,
    title: v.title || "Untitled",
    authors: v.authors || [],
    publisher: v.publisher || "",
    publishedDate: v.publishedDate || "",
    description: v.description || "",
    thumbnail: v.imageLinks?.thumbnail || v.imageLinks?.smallThumbnail || ""
  };
}

// search (will try to bias toward Christian subjects unless query includes obvious christian terms)
export async function searchBooks(q = "") {
  const safe = encodeURIComponent(q || "christian");
  const query = q && (q.toLowerCase().includes("christ") || q.toLowerCase().includes("bible"))
    ? `q=${safe}`
    : `q=subject:religion+${safe}`;
  const url = `${BASE}/volumes?${query}&maxResults=24${API_KEY ? `&key=${API_KEY}` : ""}`;
  const res = await axios.get(url);
  const items = res.data.items || [];
  return items.map(normalize);
}

export async function getBookById(id) {
  const url = `${BASE}/volumes/${id}${API_KEY ? `?key=${API_KEY}` : ""}`;
  const res = await axios.get(url);
  return normalize(res.data);
}
