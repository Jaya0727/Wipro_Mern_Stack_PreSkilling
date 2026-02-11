import React from "react";
import AddCourse from "./pages/AddCourse";
import CourseListPage from "./pages/CourseListPage";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Online Course Tracker</h1>
      <AddCourse />
      <CourseListPage />
    </div>
  );
}

export default App;

