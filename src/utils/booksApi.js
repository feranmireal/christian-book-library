import axios from "axios";

const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY || "";
const BASE = "https://www.googleapis.com/books/v1";

function toBook(item) {
  const info = item.volumeInfo || {};
  return {
    id: item.id,
    title: info.title,
    authors: info.authors || [],
    publisher: info.publisher || "",
    publishedDate: info.publishedDate || "",
    description: info.description || "",
    thumbnail: info.imageLinks?.thumbnail || info.imageLinks?.smallThumbnail || ""
  };
}

export async function searchBooks(q) {
  // For christian-only queries we can prefer subject:religion+christianity OR pass q as provided
  const safeQ = encodeURIComponent(q);
  // Try narrowing to religion if the query looks generic
  const query = q.toLowerCase().includes("christ") || q.toLowerCase().includes("bible")
    ? `q=${safeQ}`
    : `q=subject:religion+${safeQ}`;

  const url = `${BASE}/volumes?${query}&maxResults=24${API_KEY ? `&key=${API_KEY}` : ""}`;
  const res = await axios.get(url);
  const items = res.data.items || [];
  return items.map(toBook).map((b, index) => {
    // note: convert to same shape used by BookCard (volumeInfo)
    return {
      id: b.id,
      volumeInfo: {
        title: b.title,
        authors: b.authors,
        publisher: b.publisher,
        publishedDate: b.publishedDate,
        description: b.description,
        imageLinks: { thumbnail: b.thumbnail }
      }
    };
  });
}

export async function getBookById(id) {
  const url = `${BASE}/volumes/${id}${API_KEY ? `?key=${API_KEY}` : ""}`;
  const res = await axios.get(url);
  const item = res.data;
  const info = item.volumeInfo || {};
  return {
    id: item.id,
    title: info.title,
    authors: info.authors || [],
    publisher: info.publisher || "",
    publishedDate: info.publishedDate || "",
    description: info.description || "",
    thumbnail: info.imageLinks?.thumbnail || info.imageLinks?.smallThumbnail || ""
  };
}
