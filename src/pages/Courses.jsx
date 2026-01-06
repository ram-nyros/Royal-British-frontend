import CourseCard from "../components/CourseCard";

const courses = [
  {
    title: "Bakery & Pastry International DHM",
    duration: "6 Months",
    age: "20 - 28",
    placement: "Cruise Ships",
  },
  {
    title: "Bakery & Pastry International Diploma",
    duration: "6 Months",
    age: "21 - 28",
    placement: "International Hotels",
  },
  {
    title: "Diploma in Bakery & Pastry",
    duration: "3 Months",
    age: "18+",
    placement: "Hotels",
  },
];

const Courses = () => {
  return (
    <section className="py-12 container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6">Courses Offered</h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, i) => (
          <CourseCard key={i} course={course} />
        ))}
      </div>
    </section>
  );
};

export default Courses;
