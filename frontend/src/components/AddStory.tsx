import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

interface AddStoryProps {
  setStories: React.Dispatch<React.SetStateAction<any[]>>;
}

const AddStory: React.FC<AddStoryProps> = ({ setStories }) => {
  const [story, setStory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Track logged-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return alert("⚠️ Please log in first!");
    if (!story.trim()) return alert("⚠️ Please enter a story.");
    if (!image || !audio) return alert("⚠️ Please select image & audio");

    setLoading(true);
    try {
      const token = await user.getIdToken();

      const formData = new FormData();
      formData.append("story", story);
      formData.append("image", image);
      formData.append("audio", audio);

      const res = await fetch("http://localhost:5000/api/stories", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();

      setStories((prev) => [...prev, data]); // backend should return new story object
      setStory("");
      setImage(null);
      setAudio(null);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to upload story");
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

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />

      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setAudio(e.target.files?.[0] || null)}
      />

      <button
        type="submit"
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {loading ? "Submitting..." : "Add Story"}
      </button>
    </form>
  );
};

export default AddStory;
