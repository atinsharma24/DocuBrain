import { useState } from "react";
import axios from "axios";

function QueryPage() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");

  const askQuery = async () => {
    const res = await axios.post("http://localhost:8000/api/query", { query });
    setAnswer(res.data.answer);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Ask a Question</h2>
      <input
        type="text"
        className="border px-4 py-2 w-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask something about your documents..."
      />
      <button onClick={askQuery} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
        Ask
      </button>
      {answer && <p className="mt-4 border p-4 rounded bg-gray-100">{answer}</p>}
    </div>
  );
}

export default QueryPage;
