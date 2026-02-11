import React, { useState } from "react";
import Button from "../components/Button";

function AddCourse() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const addCourse = async () => {
    if (!title) {
      setError("Course title is required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title })
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setTitle("");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h3>Add Course</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="Course title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button text="Add" onClick={addCourse} />
    </div>
  );
}

export default AddCourse;
