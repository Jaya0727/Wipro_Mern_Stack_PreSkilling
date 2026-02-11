import React from "react";
import Button from "./Button";

function CourseCard({ course, onDelete }) {
  return (
    <div style={{ margin: "10px 0" }}>
      <span>{course.title}</span>
      <Button
        text="Delete"
        onClick={() => onDelete(course.id)}
      />
    </div>
  );
}

export default CourseCard;
