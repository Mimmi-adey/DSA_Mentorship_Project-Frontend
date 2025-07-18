import React, { useEffect, useState } from "react";
import axios from "axios";

interface Mentor {
  fullName: string;
  email: string;
}

const MentorProfile: React.FC = () => {
  const [mentor, setMentor] = useState<Mentor | null>(null);

  useEffect(() => {
    axios
      .get("https://dsa-mentorship-project-backend.onrender.com/api/mentor/get-mentor", {
        withCredentials: true,
      })
      .then((res) => setMentor(res.data))
      .catch((err) => console.error("Failed to load profile", err));
  }, []);

  if (!mentor) return <p>Loading profile...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-green-700">Mentor Profile</h1>
      <p><strong>Name:</strong> {mentor.fullName}</p>
      <p><strong>Email:</strong> {mentor.email}</p>
    </div>
  );
};

export default MentorProfile;