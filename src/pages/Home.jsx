import React, { useState, useEffect } from "react";
import {
  FaBars as Menu,
  FaTimes as X,
  FaChevronDown as ChevronDown,
  FaPhone as Phone,
  FaEnvelope as Mail,
  FaMapMarkerAlt as MapPin,
  FaFacebookF as Facebook,
  FaInstagram as Instagram,
  FaLinkedinIn as Linkedin,
  FaClock as Clock,
  FaAward as Award,
  FaUsers as Users,
  FaBookOpen as BookOpen,
  FaShip as Ship,
  FaGlobe as Globe,
  FaCheckCircle as CheckCircle,
  FaStar as Star,
} from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutAction } from "../features/auth/authSlice";
import { useSubmitApplicationMutation } from "../features/auth/authApiSlice";

// Mock logo - replace with your actual logo import
import logo from "../assets/home-screen.png";

// Navigation component
const SiteNavbar = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          const navbarHeight = 100; // Adjust based on your navbar height
          const elementPosition =
            el.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }, 100);
      }
    }
  }, [location]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    dispatch(logoutAction());
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["Home", "Courses", "About", "Facilities", "Contact"];

  const handleNavClick = (e, item) => {
    e.preventDefault();
    const target = document.getElementById(item.toLowerCase());
    if (target) {
      const navbarHeight = 100;
      const elementPosition =
        target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 shadow-xl"
          : "bg-white/10 backdrop-blur-2xl border-b border-white/20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 md:py-4">
          {/* Logo Section - Responsive sizing */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center bg-white rounded-xl shadow-xl overflow-hidden border-2 border-white/70 ring-2 ring-red-500/20">
              <img
                src={logo}
                alt="Royal British"
                className="w-full h-full object-contain drop-shadow-sm"
              />
            </div>
            <div>
              <h1
                className={`text-lg sm:text-2xl md:text-3xl font-bold tracking-tight transition-colors ${
                  scrolled ? "text-blue-900" : "text-white"
                }`}
              >
                ROYAL <span className="text-red-600">BRITISH</span>
              </h1>
              <p
                className={`text-xs sm:text-sm md:text-base transition-colors hidden sm:block ${
                  scrolled ? "text-gray-600" : "text-gray-100"
                }`}
              >
                International School of Bakery & Pastry
              </p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => handleNavClick(e, item)}
                className={`text-xs font-semibold uppercase tracking-[0.2em] transition-colors ${
                  scrolled
                    ? "text-gray-600 hover:text-blue-700"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {item}
              </a>
            ))}

            {user ? (
              <>
                <Link
                  to="/profile"
                  className={`text-xs font-semibold uppercase tracking-[0.2em] ${
                    scrolled ? "text-gray-700" : "text-white"
                  }`}
                >
                  {user.name || "Profile"}
                </Link>

                <button
                  onClick={handleLogout}
                  className="bg-gray-900 text-white px-4 xl:px-5 py-2 rounded-full font-semibold shadow-lg shadow-gray-900/20 hover:translate-y-0.5 transition text-sm"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className={`text-xs font-semibold uppercase tracking-[0.2em] ${
                    scrolled ? "text-gray-600" : "text-white"
                  }`}
                >
                  Sign In
                </Link>

                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 xl:px-6 py-2 rounded-full font-semibold shadow-lg shadow-red-500/30 hover:shadow-red-500/50 text-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden ${scrolled ? "text-gray-700" : "text-white"}`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-2xl border-t border-gray-100">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => handleNavClick(e, item)}
                className="block px-3 py-3 text-gray-700 font-semibold uppercase tracking-[0.2em] hover:bg-blue-50 rounded-xl text-sm"
              >
                {item}
              </a>
            ))}
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="block px-3 py-3 text-gray-700 font-semibold uppercase tracking-[0.2em] hover:bg-blue-50 rounded-xl text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {user.name || "Profile"}
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-3 text-gray-700 font-semibold uppercase tracking-[0.2em] hover:bg-blue-50 rounded-xl text-sm"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="block px-3 py-3 text-gray-700 font-semibold uppercase tracking-[0.2em] hover:bg-blue-50 rounded-xl text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>

                <Link
                  to="/signup"
                  className="block px-3 py-3 text-white bg-gradient-to-r from-red-600 to-red-700 rounded-xl text-center font-semibold shadow-lg text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
    <div className="text-blue-600 mb-4">{icon}</div>
    <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-sm lg:text-base text-gray-600">{desc}</p>
  </div>
);

// Course Card Component
const CourseCard = ({ course }) => (
  <div className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
    <div
      className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-0 group-hover:opacity-10 transition-opacity`}
    ></div>

    <div className="p-6 lg:p-8">
      <div
        className={`inline-block px-3 lg:px-4 py-1.5 lg:py-2 bg-gradient-to-r ${course.color} text-white rounded-full text-xs lg:text-sm font-semibold mb-4`}
      >
        {course.duration}
      </div>

      <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
        {course.title}
      </h3>
      {course.subtitle && (
        <p className="text-red-600 font-semibold mb-4 text-sm lg:text-base">
          {course.subtitle}
        </p>
      )}

      <div className="space-y-2 lg:space-y-3 mb-6">
        <div className="flex items-center text-gray-600 text-sm lg:text-base">
          <Clock className="w-4 h-4 lg:w-5 lg:h-5 mr-2 text-blue-600 flex-shrink-0" />
          <span>Duration: {course.duration}</span>
        </div>
        <div className="flex items-center text-gray-600 text-sm lg:text-base">
          <Users className="w-4 h-4 lg:w-5 lg:h-5 mr-2 text-blue-600 flex-shrink-0" />
          <span>Age: {course.age}</span>
        </div>
        <div className="flex items-center text-gray-600 text-sm lg:text-base">
          <BookOpen className="w-4 h-4 lg:w-5 lg:h-5 mr-2 text-blue-600 flex-shrink-0" />
          <span>Eligibility: {course.eligibility}</span>
        </div>
        <div className="flex items-center text-gray-600 text-sm lg:text-base">
          <Ship className="w-4 h-4 lg:w-5 lg:h-5 mr-2 text-blue-600 flex-shrink-0" />
          <span>Placement: {course.placement}</span>
        </div>
      </div>

      <button
        className={`w-full bg-gradient-to-r ${course.color} text-white py-2.5 lg:py-3 rounded-full font-semibold hover:scale-105 transform transition-all text-sm lg:text-base`}
      >
        Apply Now
      </button>
    </div>
  </div>
);

// Stat Card Component
const StatCard = ({ icon, value, label, color }) => (
  <div
    className={`bg-gradient-to-br ${color} p-4 lg:p-6 rounded-2xl text-white shadow-xl`}
  >
    {icon}
    <div className="text-2xl lg:text-3xl font-bold mb-2">{value}</div>
    <div className="text-xs lg:text-sm">{label}</div>
  </div>
);

// Main Component
const RoyalBritishSchool = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [submitApplication, { isLoading: isSubmitting }] =
    useSubmitApplicationMutation();
  const [applicationForm, setApplicationForm] = useState({
    name: "",
    email: "",
    mobile: "",
    course: "",
    message: "",
  });
  const [formMessage, setFormMessage] = useState({ type: "", text: "" });

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    setFormMessage({ type: "", text: "" });

    if (!user) {
      setFormMessage({
        type: "error",
        text: "Please login to submit the application form",
      });
      return;
    }

    console.log("[Home] Submitting application:", applicationForm);

    if (
      !applicationForm.name ||
      !applicationForm.email ||
      !applicationForm.mobile ||
      !applicationForm.course
    ) {
      setFormMessage({
        type: "error",
        text: "Please fill all required fields",
      });
      return;
    }

    try {
      await submitApplication(applicationForm).unwrap();
      console.log("[Home] Application submitted successfully");
      setFormMessage({
        type: "success",
        text: "Application submitted successfully!",
      });
      setApplicationForm({
        name: "",
        email: "",
        mobile: "",
        course: "",
        message: "",
      });
    } catch (error) {
      console.error("[Home] Error submitting application:", error);
      setFormMessage({
        type: "error",
        text: error?.data?.message || "Failed to submit application",
      });
    }
  };

  const courses = [
    {
      title: "BAKERY & PASTRY International DHM",
      subtitle: "(CRASH COURSE)",
      duration: "6 Months",
      age: "20 - 28",
      eligibility: "12th & above",
      placement: "Cruise Ships",
      color: "from-blue-600 to-blue-800",
    },
    {
      title: "BAKERY & PASTRY International Diploma",
      subtitle: "",
      duration: "6 Months",
      age: "21 - 28",
      eligibility: "12th & above",
      placement: "International Hotels",
      color: "from-red-600 to-red-800",
    },
    {
      title: "Diploma in BAKERY & PASTRY",
      subtitle: "",
      duration: "3 Months",
      age: "18 - Unlimited",
      eligibility: "12th & above",
      placement: "Various Opportunities",
      color: "from-blue-800 to-blue-900",
    },

    // ✅ NEW CARD
    {
      title: "Women Special Bakery Course",
      subtitle: "(For Women Only)",
      duration: "42 Days",
      age: "18 - Unlimited",
      eligibility: "No Minimum Qualification",
      placement: "Self Employment / Jobs",
      color: "from-pink-600 to-pink-800",
    },
  ];

  const features = [
    {
      icon: <Award className="w-6 h-6 lg:w-8 lg:h-8" />,
      title: "100% Placement",
      desc: "World class career opportunities",
    },
    {
      icon: <BookOpen className="w-6 h-6 lg:w-8 lg:h-8" />,
      title: "Expert Faculty",
      desc: "Industry professionals",
    },
    {
      icon: <Users className="w-6 h-6 lg:w-8 lg:h-8" />,
      title: "Global Network",
      desc: "100+ shipping companies",
    },
    {
      icon: <Ship className="w-6 h-6 lg:w-8 lg:h-8" />,
      title: "Cruise Ship Jobs",
      desc: "International exposure",
    },
    {
      icon: <Globe className="w-6 h-6 lg:w-8 lg:h-8" />,
      title: "Multicultural",
      desc: "Diverse work force",
    },
    {
      icon: <Clock className="w-6 h-6 lg:w-8 lg:h-8" />,
      title: "Flexible Timing",
      desc: "90hrs online/offline",
    },
  ];

  const benefits = [
    "Free Medical",
    "Free SID",
    "Free CDC",
    "Free Yellow Fever",
    "E-Learning",
    "Class Material",
    "Free Internet WiFi",
    "Study Rooms",
    "AC Facilities",
    "Bathroom Accessories",
  ];

  const requirements = [
    "Carry Documents",
    "Passport & CDC",
    "Medical & SID",
    "Experience Certificate",
    "Study Certificates",
  ];

  return (
    <div className="min-h-screen bg-white">
      <SiteNavbar />

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 lg:pt-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-red-900">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-64 h-64 lg:w-96 lg:h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 lg:w-96 lg:h-96 bg-red-400 rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
          </div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-12 lg:py-0">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12 text-center lg:text-left">
            <div className="flex-1">
              <p className="uppercase tracking-[0.2em] lg:tracking-[0.3em] text-xs lg:text-sm text-white/70 mb-3 lg:mb-4">
                ROYAL BRITISH Culinary Academy
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 lg:mb-6 leading-tight">
                Shape Your Future in
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
                  Hospitality Industry
                </span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-200 mb-6 lg:mb-10 max-w-2xl mx-auto lg:mx-0">
                6 Months Professional Training • 100% Placement • International
                Opportunities
              </p>

              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center lg:justify-start">
                <a
                  href="#courses"
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.getElementById("courses");
                    if (target) {
                      const navbarHeight = 100;
                      const elementPosition =
                        target.getBoundingClientRect().top + window.pageYOffset;
                      const offsetPosition = elementPosition - navbarHeight;
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 lg:px-10 py-3 lg:py-4 rounded-full font-semibold hover:scale-105 transform transition-all shadow-2xl hover:shadow-red-500/50 text-sm lg:text-base"
                >
                  Explore Courses
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.getElementById("contact");
                    if (target) {
                      const navbarHeight = 100;
                      const elementPosition =
                        target.getBoundingClientRect().top + window.pageYOffset;
                      const offsetPosition = elementPosition - navbarHeight;
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="bg-white/90 text-blue-900 px-8 lg:px-10 py-3 lg:py-4 rounded-full font-semibold hover:scale-105 transform transition-all shadow-2xl text-sm lg:text-base"
                >
                  Apply Now
                </a>
              </div>

              <div className="mt-8 lg:mt-12 flex flex-wrap justify-center lg:justify-start gap-6 lg:gap-8 text-white">
                {[
                  { value: "10%", label: "Discount Offer" },
                  { value: "100%", label: "Placement" },
                  { value: "40+", label: "Companies" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-yellow-300">
                      {stat.value}
                    </div>
                    <div className="text-xs lg:text-sm tracking-wide text-white/80">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 max-w-md w-full">
              <div className="relative bg-white/10 backdrop-blur-xl p-1 rounded-[24px] lg:rounded-[32px] border border-white/30 shadow-2xl">
                <div className="bg-white rounded-[20px] lg:rounded-[28px] p-6 lg:p-8 text-gray-900 space-y-4 lg:space-y-6">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 mx-auto rounded-2xl border-2 border-blue-100 shadow-inner flex items-center justify-center overflow-hidden">
                    <img
                      src={logo}
                      alt="Royal British logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-xs lg:text-sm uppercase tracking-[0.3em] lg:tracking-[0.4em] text-gray-500">
                      Est. 2009
                    </p>
                    <p className="text-lg lg:text-2xl font-bold text-blue-900">
                      Trusted by aspiring chefs worldwide
                    </p>
                    <p className="text-gray-500 text-xs lg:text-sm">
                      Book a campus tour to experience our state-of-the-art
                      kitchens
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-3 lg:gap-4 text-center text-xs lg:text-sm">
                    <div>
                      <p className="text-xl lg:text-2xl font-bold text-blue-900">
                        15+
                      </p>
                      <p className="text-gray-500">Years Legacy</p>
                    </div>
                    <div>
                      <p className="text-xl lg:text-2xl font-bold text-blue-900">
                        6K
                      </p>
                      <p className="text-gray-500">Alumni</p>
                    </div>
                    <div>
                      <p className="text-xl lg:text-2xl font-bold text-blue-900">
                        24x7
                      </p>
                      <p className="text-gray-500">Support</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-3 lg:-top-5 -right-3 lg:-right-5 bg-gradient-to-r from-yellow-400 to-red-400 text-white text-xs font-semibold px-3 lg:px-4 py-1.5 lg:py-2 rounded-full shadow-lg uppercase tracking-wide">
                  Premium Campus
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
        </div>
      </section>

      {/* Special Offers Banner */}
      <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400 text-white py-3 lg:py-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm lg:text-lg font-bold animate-pulse">
            🎉 Limited Time Offer: 10% OFF on Institution Fee + 10% Discount on
            Check-in! 🎉
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <section className="py-12 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <div className="w-20 lg:w-24 h-1 bg-gradient-to-r from-blue-600 to-red-600 mx-auto"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, idx) => (
              <FeatureCard key={idx} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section - Add scroll padding */}
      <section id="courses" className="py-12 lg:py-20 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Courses Offered
            </h2>
            <div className="w-20 lg:w-24 h-1 bg-gradient-to-r from-blue-600 to-red-600 mx-auto mb-4"></div>
            <p className="text-sm lg:text-base text-gray-600 max-w-2xl mx-auto">
              Professional programs designed to launch your career in the
              hospitality industry
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {courses.map((course, idx) => (
              <CourseCard key={idx} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section
        id="facilities"
        className="py-12 lg:py-20 bg-gradient-to-br from-blue-50 to-red-50 scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Student Facilities
            </h2>
            <div className="w-20 lg:w-24 h-1 bg-gradient-to-r from-blue-600 to-red-600 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-8 lg:mb-12">
            <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-xl">
              <h3 className="text-xl lg:text-2xl font-bold text-blue-900 mb-4 lg:mb-6 flex items-center">
                <Award className="w-6 h-6 lg:w-8 lg:h-8 mr-3 text-blue-600 flex-shrink-0" />
                STCW Class (21 Days)
              </h3>
              <ul className="space-y-2 lg:space-y-3">
                {benefits.slice(0, 5).map((benefit, idx) => (
                  <li
                    key={idx}
                    className="flex items-center text-sm lg:text-base text-gray-700"
                  >
                    <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 mr-3 text-green-600 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-xl">
              <h3 className="text-xl lg:text-2xl font-bold text-blue-900 mb-4 lg:mb-6 flex items-center">
                <BookOpen className="w-6 h-6 lg:w-8 lg:h-8 mr-3 text-blue-600 flex-shrink-0" />
                Study Rooms (90 Days)
              </h3>
              <ul className="space-y-2 lg:space-y-3">
                {benefits.slice(5).map((benefit, idx) => (
                  <li
                    key={idx}
                    className="flex items-center text-sm lg:text-base text-gray-700"
                  >
                    <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 mr-3 text-green-600 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-900 to-red-900 p-6 lg:p-8 rounded-2xl shadow-xl text-white">
            <h3 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6 flex items-center">
              <Ship className="w-6 h-6 lg:w-8 lg:h-8 mr-3 flex-shrink-0" />
              Contract Period - Permanent Contract
            </h3>
            {/* <ul className="grid sm:grid-cols-2 gap-3 lg:gap-4">
              {requirements.map((req, idx) => (
                <li
                  key={idx}
                  className="flex items-center text-sm lg:text-base"
                >
                  <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 mr-3 text-yellow-400 flex-shrink-0" />
                  {req}
                </li>
              ))}
            </ul> */}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 lg:py-20 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 lg:mb-6">
                Our Promise
              </h2>
              <div className="w-20 lg:w-24 h-1 bg-gradient-to-r from-blue-600 to-red-600 mb-4 lg:mb-6"></div>
              <p className="text-base lg:text-lg text-gray-700 mb-4 lg:mb-6">
                The ROYAL BRITISH International School training leads by doing
                the right things in the right way. We enable everyone to perform
                at their best while challenging ourselves to responsibly shape
                the industry and make a positive impact in our communities.
              </p>
              <p className="text-base lg:text-lg text-gray-700 mb-6 lg:mb-8">
                We value diversity and provide an inclusive environment for our
                people, regardless of their race, ethnicity, nationality,
                gender, age, sexual orientation, faith or political beliefs.
              </p>

              <div className="space-y-3 lg:space-y-4">
                {[
                  "Expert Lecturers & Industry Exposure",
                  "Line Training & Placements",
                  "Student Success & Future Development",
                ].map((text, idx) => (
                  <div key={idx} className="flex items-start">
                    <Star className="w-5 h-5 lg:w-6 lg:h-6 mr-3 text-yellow-500 flex-shrink-0 mt-1" />
                    <p className="text-sm lg:text-base text-gray-700">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              <StatCard
                icon={<Globe className="w-8 h-8 lg:w-12 lg:h-12 mb-4" />}
                value="40+"
                label="Shipping Companies"
                color="from-blue-600 to-blue-800"
              />
              <div className="mt-6 lg:mt-8">
                <StatCard
                  icon={<Users className="w-8 h-8 lg:w-12 lg:h-12 mb-4" />}
                  value="5"
                  label="Countries Network"
                  color="from-red-600 to-red-800"
                />
              </div>
              <StatCard
                icon={<Award className="w-8 h-8 lg:w-12 lg:h-12 mb-4" />}
                value="100%"
                label="Placement Rate"
                color="from-blue-800 to-blue-900"
              />
              <div className="mt-6 lg:mt-8">
                <StatCard
                  icon={<BookOpen className="w-8 h-8 lg:w-12 lg:h-12 mb-4" />}
                  value="World"
                  label="Class Faculty"
                  color="from-red-800 to-red-900"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-12 lg:py-20 bg-gradient-to-br from-blue-900 to-red-900 text-white scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Get In Touch
            </h2>
            <div className="w-20 lg:w-24 h-1 bg-white mx-auto mb-4"></div>
            <p className="text-sm lg:text-base text-gray-200 max-w-2xl mx-auto">
              Ready to start your journey? Contact us today for more information
              or to schedule a visit
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-6 lg:space-y-8">
              {[
                {
                  icon: <Phone className="w-5 h-5 lg:w-6 lg:h-6" />,
                  title: "Phone",
                  text: "833 1086 333",
                },
                {
                  icon: <Mail className="w-5 h-5 lg:w-6 lg:h-6" />,
                  title: "Email",
                  text: "enquiry@royalbritish.com",
                },
                {
                  icon: <MapPin className="w-5 h-5 lg:w-6 lg:h-6" />,
                  title: "Address",
                  text: "Plot No. Rm Trinity Art, Visakalakshi Nagar\nVetrinary Colony, Visakhapatnam - 530040\nA.P. India",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-3 lg:space-x-4"
                >
                  <div className="bg-white/10 p-3 lg:p-4 rounded-full flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-sm lg:text-base">
                      {item.title}
                    </h3>
                    <p className="text-sm lg:text-base text-gray-200 whitespace-pre-line">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}

              <div className="flex space-x-3 lg:space-x-4">
                {[Facebook, Instagram, Linkedin].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="bg-white/10 p-2.5 lg:p-3 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <Icon className="w-5 h-5 lg:w-6 lg:h-6" />
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg p-6 lg:p-8 rounded-2xl">
              <h3 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">
                Application Form
              </h3>
              {!user && (
                <div className="mb-4 p-4 rounded-lg bg-yellow-500/20 text-yellow-200 border border-yellow-500/30 text-sm">
                  <p className="font-medium">
                    Please login to submit your application
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate("/signin")}
                    className="mt-2 text-yellow-100 underline hover:text-white"
                  >
                    Click here to login
                  </button>
                </div>
              )}
              {formMessage.text && (
                <div
                  className={`mb-4 p-3 rounded-lg text-sm ${
                    formMessage.type === "success"
                      ? "bg-green-500/20 text-green-200 border border-green-500/30"
                      : "bg-red-500/20 text-red-200 border border-red-500/30"
                  }`}
                >
                  {formMessage.text}
                </div>
              )}
              <form
                className="space-y-3 lg:space-y-4"
                onSubmit={handleApplicationSubmit}
              >
                <input
                  type="text"
                  placeholder="Full Name"
                  value={applicationForm.name}
                  onChange={(e) =>
                    setApplicationForm({
                      ...applicationForm,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 lg:py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:border-white/40 text-sm lg:text-base"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={applicationForm.email}
                  onChange={(e) =>
                    setApplicationForm({
                      ...applicationForm,
                      email: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 lg:py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:border-white/40 text-sm lg:text-base"
                />
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  value={applicationForm.mobile}
                  onChange={(e) =>
                    setApplicationForm({
                      ...applicationForm,
                      mobile: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 lg:py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:border-white/40 text-sm lg:text-base"
                />
                <select
                  value={applicationForm.course}
                  onChange={(e) =>
                    setApplicationForm({
                      ...applicationForm,
                      course: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 lg:py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-white/40 text-sm lg:text-base"
                >
                  <option value="" className="bg-blue-900">
                    Select Course
                  </option>
                  <option
                    value="Bakery & Pastry International DHM"
                    className="bg-blue-900"
                  >
                    Bakery & Pastry International DHM
                  </option>
                  <option
                    value="Bakery & Pastry International Diploma"
                    className="bg-blue-900"
                  >
                    Bakery & Pastry International Diploma
                  </option>
                  <option
                    value="Diploma in Bakery & Pastry"
                    className="bg-blue-900"
                  >
                    Diploma in Bakery & Pastry
                  </option>
                  <option
                    value="Diploma in Bakery & Pastry"
                    className="bg-blue-900"
                  >
                    42 Days DHM "Womens"
                  </option>
                </select>
                <textarea
                  placeholder="Message (Optional)"
                  rows="4"
                  value={applicationForm.message}
                  onChange={(e) =>
                    setApplicationForm({
                      ...applicationForm,
                      message: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 lg:py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:border-white/40 text-sm lg:text-base"
                ></textarea>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-blue-900 py-2.5 lg:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-6 lg:mb-8">
            <div>
              <h4 className="font-bold text-lg lg:text-xl mb-3 lg:mb-4">
                ROYAL BRITISH
              </h4>
              <p className="text-sm lg:text-base text-white">
                Building trust, driving performance, and shaping a better
                future.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3 lg:mb-4 text-sm lg:text-base">
                Vision & Values
              </h4>
              <ul className="space-y-1.5 lg:space-y-2 text-xs lg:text-sm text-white">
                {[
                  "Be Kind",
                  "Be Respectful",
                  "Be Responsible",
                  "Work Hard",
                  "Have Fun",
                ].map((value, idx) => (
                  <li key={idx}>{value}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 lg:mb-4 text-sm lg:text-base">
                Quick Links
              </h4>
              <ul className="space-y-1.5 lg:space-y-2 text-xs lg:text-sm text-white">
                {["Courses", "About Us", "Facilities", "Contact"].map(
                  (link, idx) => (
                    <li key={idx}>
                      <a
                        href={`#${link.toLowerCase().replace(" ", "")}`}
                        className="hover:text-white"
                      >
                        {link}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 lg:mb-4 text-sm lg:text-base">
                Leave a Review
              </h4>
              <div className="flex space-x-1 mb-3 lg:mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-white text-xs lg:text-sm">
                Share your experience with us!
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 lg:pt-8 text-center text-white text-xs lg:text-sm">
            <p>
              &copy; 2024 ROYAL BRITISH International School. A unit of ROYAL
              BRITISH Private Limited.
            </p>
            <p className="mt-2">www.royalbritish.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RoyalBritishSchool;
