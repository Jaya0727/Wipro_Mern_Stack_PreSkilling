import React from "react";
import CourseCard from "./CourseCard";


function CourseList({ courses, onDelete }) {
  return (
    <div>
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default CourseList;
