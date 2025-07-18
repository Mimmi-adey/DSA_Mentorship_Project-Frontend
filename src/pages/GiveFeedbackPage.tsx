// GiveFeedbackPage.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function GiveFeedbackPage() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Replace with real API call
    console.log("Feedback submitted for session", sessionId, feedback);
    navigate("/my-sessions"); // Redirect back after submission
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Give Feedback</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={5}
          className="w-full p-3 border rounded-lg"
          placeholder="Share your thoughts about the session..."
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}