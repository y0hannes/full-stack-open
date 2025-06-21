import Content from "../../../part1/courseinfo/src/Content";
import Header from "./Header";
import Total from "./Total";

const Course = ({ courses }) => {
  return (
    <>
      {courses.map((course) => (
        <li key={course.id}>
          <Header title={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </li>
      ))}
    </>
  );
};

export default Course;