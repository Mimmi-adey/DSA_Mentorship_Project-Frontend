import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface Request {
  _id: string;
  mentee: {
    fullName: string;
    email: string;
  };
  status: string;
}

export default function MentorRequests() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRequests = async () => {
    try {
      const res = await axios.get("/api/mentor/requests", {
        withCredentials: true,
      });
      setRequests(res.data);
    } catch (err) {
      console.error("Error fetching requests:", err);
      setError("Failed to fetch mentee requests.");
    } finally {
      setLoading(false);
    }
  };

  const respondToRequest = async (id: string, action: "accept" | "reject") => {
    try {
      await axios.put(
        `/api/mentor/requests/${id}`,
        { action },
        { withCredentials: true }
      );
      toast.success(`Request ${action}ed`);
      fetchRequests(); // Refresh list
    } catch (err) {
      console.error("Error responding to request:", err);
      toast.error("Failed to respond to request.");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-green-700 animate-pulse">Loading...</span>
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
      <h1 className="text-2xl font-bold mb-4">Mentee Requests</h1>
      {requests.length === 0 ? (
        <p>No mentee requests found.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((req) => (
            <li
              key={req._id}
              className="border p-4 rounded-md shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{req.mentee.fullName}</p>
                <p className="text-sm text-gray-600">{req.mentee.email}</p>
                <p className="text-sm text-gray-400">Status: {req.status}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => respondToRequest(req._id, "accept")}
                  className="bg-green-600 text-white px-4 py-1 rounded"
                >
                  Accept
                </button>
                <button
                  onClick={() => respondToRequest(req._id, "reject")}
                  className="bg-red-600 text-white px-4 py-1 rounded"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}