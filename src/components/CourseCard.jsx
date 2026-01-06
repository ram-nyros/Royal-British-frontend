const CourseCard = ({ course }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 text-left">
      <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Duration: {course.duration}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Age: {course.age}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Placement: {course.placement}
      </p>
    </div>
  );
};

export default CourseCard;
