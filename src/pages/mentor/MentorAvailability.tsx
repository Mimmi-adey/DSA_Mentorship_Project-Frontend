import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const MentorAvailability: React.FC = () => {
  const [availability, setAvailability] = useState<{ [day: string]: { start: string; end: string }[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://dsa-mentorship-project-backend.onrender.com/api/mentor/availability", {
        withCredentials: true,
      })
      .then((res) => {
        setAvailability(res.data.availability || {});
      })
      .catch((err) => {
        console.error("Failed to fetch availability", err);
        setError("Failed to load availability");
      })
      .finally(() => setLoading(false));
  }, []);

  const addSlot = (day: string) => {
    const slots = availability[day] || [];
    setAvailability({
      ...availability,
      [day]: [...slots, { start: "", end: "" }],
    });
  };

  const updateSlot = (day: string, index: number, field: "start" | "end", value: string) => {
    const slots = availability[day] || [];
    slots[index][field] = value;
    setAvailability({
      ...availability,
      [day]: [...slots],
    });
  };

  const removeSlot = (day: string, index: number) => {
    const slots = availability[day] || [];
    slots.splice(index, 1);
    setAvailability({
      ...availability,
      [day]: [...slots],
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        "https://dsa-mentorship-project-backend.onrender.com/api/mentor/availability",
        { availability },
        { withCredentials: true }
      );
      toast.success("Availability saved!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save availability");
    }
  };

  if (loading) return <p className="p-4 text-green-700">Loading...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Set Weekly Availability</h2>

      <div className="space-y-6">
        {daysOfWeek.map((day) => (
          <div key={day} className="bg-white shadow p-4 rounded border">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{day}</h3>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                onClick={() => addSlot(day)}
              >
                + Add Time Slot
              </button>
            </div>

            {(availability[day] || []).map((slot, index) => (
              <div key={index} className="flex items-center gap-4 mb-2">
                <input
                  type="time"
                  value={slot.start}
                  onChange={(e) => updateSlot(day, index, "start", e.target.value)}
                  className="border rounded px-3 py-1"
                />
                <span>to</span>
                <input
                  type="time"
                  value={slot.end}
                  onChange={(e) => updateSlot(day, index, "end", e.target.value)}
                  className="border rounded px-3 py-1"
                />
                <button
                  onClick={() => removeSlot(day, index)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}

            {availability[day]?.length === 0 && (
              <p className="text-sm text-gray-500 italic">No slots added</p>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Save Availability
      </button>
    </div>
  );
};

export default MentorAvailability;