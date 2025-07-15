import { useState, useEffect } from "react";
import AdminLayout from "../layouts/AdminLayout";
import {
  PendingMentors,
  AssignMentor,
  AssignedPairs,
  MentorList,
  MenteeList,
} from "../component/AdminTabs";
import axios from "axios";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [totalMentors, setTotalMentors] = useState(0);
  const [totalMentees, setTotalMentees] = useState(0);
  const [totalAssignments, setTotalAssignments] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "https://dsa-mentorship-project-backend.onrender.com/api/admin/stats",
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setTotalMentors(res.data.totalMentors || 0);
        setTotalMentees(res.data.totalMentees || 0);
        setTotalAssignments(res.data.totalAssignments || 0);
      } catch (err) {
        console.error("Stats fetch error", err);
        setError("Unable to load dashboard stats.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchStats();
    }
  }, [token]);

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50 p-6 space-y-8">
        <h1 className="text-3xl font-bold text-emerald-700">Admin Dashboard</h1>

        {/* KPI Section */}
        {loading ? (
          <p className="text-gray-600">Loading stats...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div className="bg-white shadow rounded-xl p-4">
              <p className="text-gray-500">Total Mentors</p>
              <h2 className="text-2xl font-semibold text-green-600">{totalMentors}</h2>
            </div>
            <div className="bg-white shadow rounded-xl p-4">
              <p className="text-gray-500">Total Mentees</p>
              <h2 className="text-2xl font-semibold text-blue-600">{totalMentees}</h2>
            </div>
            <div className="bg-white shadow rounded-xl p-4">
              <p className="text-gray-500">Assigned Pairs</p>
              <h2 className="text-2xl font-semibold text-indigo-600">{totalAssignments}</h2>
            </div>
          </div>
        )}

        {/* Overview Cards */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              onClick={() => setActiveTab("approved")}
              className="cursor-pointer bg-white p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Users</h2>
              <p className="text-gray-600">View and manage all users on the platform.</p>
            </div>

            <div
              onClick={() => setActiveTab("pending")}
              className="cursor-pointer bg-white p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Mentor Approvals</h2>
              <p className="text-gray-600">Review and approve pending mentor requests.</p>
            </div>

            <div
              onClick={() => setActiveTab("assigned")}
              className="cursor-pointer bg-white p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Reports</h2>
              <p className="text-gray-600">View assigned pairs and handle issues.</p>
            </div>
          </div>
        )}

        {/* Tabs Navigation */}
        <div className="flex flex-wrap gap-4 pt-4 border-t">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-1 rounded ${
              activeTab === "overview"
                ? "bg-emerald-600 text-white"
                : "bg-white text-emerald-600 border border-emerald-600"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-4 py-1 rounded ${
              activeTab === "pending"
                ? "bg-yellow-500 text-white"
                : "bg-white text-yellow-600 border border-yellow-600"
            }`}
          >
            Pending Approvals
          </button>
          <button
            onClick={() => setActiveTab("approved")}
            className={`px-4 py-1 rounded ${
              activeTab === "approved"
                ? "bg-green-600 text-white"
                : "bg-white text-green-600 border border-green-600"
            }`}
          >
            Approved Mentors
          </button>
          <button
            onClick={() => setActiveTab("mentees")}
            className={`px-4 py-1 rounded ${
              activeTab === "mentees"
                ? "bg-purple-600 text-white"
                : "bg-white text-purple-600 border border-purple-600"
            }`}
          >
            All Mentees
          </button>
          <button
            onClick={() => setActiveTab("assign")}
            className={`px-4 py-1 rounded ${
              activeTab === "assign"
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 border border-blue-600"
            }`}
          >
            Assign Mentors
          </button>
          <button
            onClick={() => setActiveTab("assigned")}
            className={`px-4 py-1 rounded ${
              activeTab === "assigned"
                ? "bg-indigo-600 text-white"
                : "bg-white text-indigo-600 border border-indigo-600"
            }`}
          >
            View Assignments
          </button>

           <button
            onClick={() => setActiveTab("assignments")}
            className={`px-4 py-1 rounded ${
              activeTab === "assigned"
                ? "bg-purple-600 text-white"
                : "bg-white text-purple-600 border border-purple-600"
            }`}
          >
            View Ratings ⭐
          </button>

        </div>

        {/* Tab Content */}
        <div className="pt-4">
          {activeTab === "pending" && <PendingMentors />}
          {activeTab === "approved" && <MentorList />}
          {activeTab === "mentees" && <MenteeList />}
          {activeTab === "assign" && <AssignMentor />}
          {activeTab === "assigned" && <AssignedPairs />}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;