import { Routes, Route } from "react-router-dom";

import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Admissions from "./pages/Admissions";
import Apply from "./pages/Apply";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* 🔐 Protected */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>

      <Footer />
    </>
  );
}

export default App;
