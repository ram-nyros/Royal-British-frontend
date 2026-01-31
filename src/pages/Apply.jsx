import { useState } from "react";
import { useSubmitApplicationMutation } from "../features/auth/authApiSlice";

const Apply = () => {
  const [submitApplication, { isLoading }] = useSubmitApplicationMutation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    course: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await submitApplication(form).unwrap();
      alert("Application submitted");
    } catch (error) {
      alert(error?.data?.message || "Failed to submit application");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <h2>Application / Admission Form</h2>

      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Mobile"
        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
      />
      <select onChange={(e) => setForm({ ...form, course: e.target.value })}>
        <option>Select Course</option>
        <option>Bakery & Pastry DHM</option>
        <option>International Diploma</option>
      </select>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Apply Now"}
      </button>
    </form>
  );
};

export default Apply;
