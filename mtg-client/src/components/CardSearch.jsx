import React, { useState } from "react";

export default function CardSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e) {
    const value = e.target.value;
    setQuery(value);

    if (value.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://api.scryfall.com/cards/search?q=${encodeURIComponent(value)}`
      );
      const data = await res.json();

      if (data.data) {
        setResults(data.data.slice(0, 10)); // limit to 10 results
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    }
    setLoading(false);
  }

  return (
    <div style={{ margin: "1rem" }}>
      <input
        type="text"
        placeholder="Search Magic cards..."
        value={query}
        onChange={handleSearch}
        style={{ padding: "0.5rem", width: "100%", maxWidth: "400px" }}
      />
      {loading && <p>Loading...</p>}
      <ul>
        {results.map((card) => (
          <li key={card.id} style={{ margin: "0.5rem 0", display: "flex", alignItems: "center" }}>
            {card.image_uris?.small && (
              <img src={card.image_uris.small} alt={card.name} width={40} style={{ marginRight: 10 }} />
            )}
            <div>
              <strong>{card.name}</strong> — {card.set_name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
