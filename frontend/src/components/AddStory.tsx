import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

import { postStoryWithAuth } from "../apiHelpers";

interface AddStoryProps {
  setStories: React.Dispatch<React.SetStateAction<any[]>>;
}

const AddStory: React.FC<AddStoryProps> = ({ setStories }) => {
  const [story, setStory] = useState("");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // 👤 Track logged-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("⚠️ Please log in first!");
      return;
    }
    if (!story.trim()) {
      alert("⚠️ Please enter a story.");
      return;
    }

    setLoading(true);
    try {
      const newStory = {
        artisan: user.displayName || user.email,
        userId: user.uid,
        story,
      };

      // ✅ Post with token
      const res = await postStoryWithAuth(newStory);

      // ✅ Update UI instantly
      setStories((prev) => [...prev, { id: res.id, ...newStory }]);
      setStory("");
    } catch (err) {
      console.error("Error adding story:", err);
      alert("❌ Failed to add story. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 my-4">
      <textarea
        placeholder="Write your story..."
        value={story}
        onChange={(e) => setStory(e.target.value)}
        className="border p-2 rounded w-full"
        rows={4}
      />
      <button>
        type="submit"
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
        }`}
        {loading ? "Submitting..." : "Add Story"}
      </button>
    </form>
  );
};

export default AddStory;
