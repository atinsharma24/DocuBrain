import { useState } from "react";
import { askQuery } from "../api/api"; // make sure this path is correct

function Ask() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const res = await askQuery(query);
      setResponse(res.data.response || "No response received.");
    } catch (err) {
      console.error("Query failed", err);
      setResponse("Query failed.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Ask a Question</h2>
      <form onSubmit={handleAsk} className="space-y-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your question..."
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Ask
        </button>
      </form>
      {response && (
        <div className="mt-4 p-4 bg-gray-100 rounded border">
          <strong>Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default Ask;
