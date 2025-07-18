import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface Session {
  _id: string;
  scheduledDate: string;
  mentee: {
    fullName: string;
    email: string;
  };
  feedbackSubmitted?: boolean;
}

export default function Sessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [feedbacks, setFeedbacks] = useState<{ [id: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const fetchSessions = async () => {
    try {
      const res = await axios.get("/api/mentor/sessions", { withCredentials: true });
      setSessions(res.data);
    } catch (err) {
      console.error("Error fetching sessions:", err);
      setError("Failed to load sessions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleFeedbackChange = (sessionId: string, value: string) => {
    setFeedbacks((prev) => ({
      ...prev,
      [sessionId]: value,
    }));
  };

  const submitFeedback = async (id: string) => {
    const feedback = feedbacks[id];
    if (!feedback || feedback.trim() === "") {
      toast.error("Feedback cannot be empty");
      return;
    }

    try {
      await axios.post(
        `/api/mentor/sessions/${id}/feedback`,
        { feedback },
        { withCredentials: true }
      );
      toast.success("Feedback submitted");
      setFeedbacks((prev) => ({ ...prev, [id]: "" }));
    } catch (err) {
      console.error("Error submitting feedback:", err);
      toast.error("Failed to submit feedback");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-green-700 animate-pulse">Loading sessions...</span>
      </div>
    );

  if (error)
    return (
      <div className="p-4 text-red-600 font-semibold">
        Error loading data: {error}
      </div>
    );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Sessions</h1>

      {sessions.length === 0 ? (
        <p>No upcoming sessions.</p>
      ) : (
        <ul className="space-y-6">
          {sessions.map((session) => (
            <li
              key={session._id}
              className="border p-4 rounded-md shadow-sm space-y-2"
            >
              <div>
                <p className="font-semibold">{session.mentee.fullName}</p>
                <p className="text-sm text-gray-600">{session.mentee.email}</p>
                <p className="text-sm text-blue-600 mt-1">
                  {new Date(session.scheduledDate).toLocaleString()}
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Write feedback..."
                  className="border rounded px-3 py-1 flex-grow"
                  value={feedbacks[session._id] || ""}
                  onChange={(e) =>
                    handleFeedbackChange(session._id, e.target.value)
                  }
                />
                <button
                  onClick={() => submitFeedback(session._id)}
                  className="bg-green-600 text-white px-4 py-1 rounded"
                >
                  Submit Feedback
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}