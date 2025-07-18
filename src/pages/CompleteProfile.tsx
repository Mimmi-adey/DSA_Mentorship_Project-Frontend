import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShopContext } from "../context";

const skillOptions = [
  "Web Development",
  "Product Design",
  "Data Analysis",
  "Public Speaking",
  "Project Management",
  "UX Research",
  "Software Engineering",
  "Marketing",
  "Architecture",
  "Virtual Assistant",
];

const CompleteProfile = () => {
  const { backendUrl } = useShopContext()!;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    skills: [] as string[],
    goals: "",
    agree: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value } = e.target;

  if (name === "agree") {
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  } else {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
};


  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      alert("You must be logged in");
      return;
    }

    try {
      const res = await fetch(`${backendUrl}/api/editProfile/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          bio: formData.bio,
          skills: formData.skills,
          goal: formData.goals,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        navigate("/dashboard");
      } else {
        alert(data.message || "Profile update failed");
      }
    } catch (err) {
      console.error("Complete profile error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-4">Complete Your Profile</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Help us know you better so we can tailor your experience.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Short Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={3}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Skills</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {skillOptions.map((skill) => (
                <label
                  key={skill}
                  className={`border px-3 py-1 rounded-full text-sm cursor-pointer ${
                    formData.skills.includes(skill)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.skills.includes(skill)}
                    onChange={() => handleSkillToggle(skill)}
                    className="hidden"
                  />
                  {skill}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Goals</label>
            <input
              type="text"
              name="goals"
              value={formData.goals}
              onChange={handleChange}
              placeholder="e.g., Improve product design skills"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-sm">
              I agree to the platform’s terms and privacy policy.
            </label>
          </div>

          <button
            type="submit"
            disabled={!formData.agree}
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 disabled:opacity-50"
          >
            Submit Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;