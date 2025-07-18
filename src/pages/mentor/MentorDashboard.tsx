import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "../../component/card";
import MentorSessions from "./MentorSessions";
import MentorRequests from "./MentorRequests";
import MentorAvailability from "./MentorAvailability";

interface User {
  _id: string;
  fullName: string;
  email: string;
}
interface Session {
  _id: string;
  scheduledDate: string;
  mentee: User;
}
interface Match {
  _id: string;
  status: string;
  mentee: User;
}
interface DashboardData {
  mentor: User;
  upcomingSessions: Session[];
  pendingRequests: Match[];
}

const MentorDashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("overview");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get(
          "https://dsa-mentorship-project-backend.onrender.com/api/mentor/dashboard",
          { withCredentials: true }
        );
        setData(res.data);
      } catch (error) {
        console.error("Failed to fetch dashboard", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="p-4 text-green-700 animate-pulse">Loading...</div>
    );
  }

  if (!data) {
    return <div className="p-4 text-red-600">Failed to load dashboard data.</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {data.mentor.fullName}</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 border-b pb-2">
        {["overview", "sessions", "requests", "availability"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1 rounded capitalize ${
              activeTab === tab
                ? "bg-green-600 text-white"
                : "bg-white text-green-700 border border-green-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <>
          <section>
            <h2 className="text-xl font-semibold mb-2">Upcoming Sessions</h2>
            {data.upcomingSessions.length === 0 ? (
              <p>No upcoming sessions.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {data.upcomingSessions.map((session) => (
                  <Card key={session._id}>
                    <CardContent className="p-4">
                      <p><strong>Mentee:</strong> {session.mentee.fullName}</p>
                      <p><strong>Date:</strong> {new Date(session.scheduledDate).toLocaleString()}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Pending Requests</h2>
            {data.pendingRequests.length === 0 ? (
              <p>No pending requests.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {data.pendingRequests.map((match) => (
                  <Card key={match._id}>
                    <CardContent className="p-4">
                      <p><strong>Mentee:</strong> {match.mentee.fullName}</p>
                      <p><strong>Email:</strong> {match.mentee.email}</p>
                      <p><strong>Status:</strong> {match.status}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </>
      )}

      {activeTab === "sessions" && <MentorSessions />}
      {activeTab === "requests" && <MentorRequests />}
      {activeTab === "availability" && <MentorAvailability />}
    </div>
  );
};

export default MentorDashboard;