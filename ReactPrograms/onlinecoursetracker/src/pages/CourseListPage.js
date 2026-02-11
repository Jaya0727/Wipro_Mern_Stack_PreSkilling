import React, { useEffect, useState } from "react";
import CourseList from "../components/CourseList";

function CourseListPage() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  const fetchCourses = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/courses");
      const data = await res.json();

      if (data.error) throw new Error(data.error);

      setCourses(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const deleteCourse = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/courses/${id}`,
        { method: "DELETE" }
      );

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      fetchCourses();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h3>Course List</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <CourseList courses={courses} onDelete={deleteCourse} />
    </div>
  );
}

export default CourseListPage;
