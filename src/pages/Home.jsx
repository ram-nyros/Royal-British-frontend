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

const RoyalBritishBakery = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const courses = [
    {
      title: "Bakery & Pastry International DHM",
      subtitle: "(CRASH COURSE)",
      duration: "6 Months",
      age: "20 - 28",
      eligibility: "12th & above",
      placement: "Cruise Ships",
      color: "from-blue-600 to-blue-800",
    },
    {
      title: "Bakery & Pastry International Diploma",
      subtitle: "",
      duration: "6 Months",
      age: "21 - 28",
      eligibility: "12th & above",
      placement: "International Hotels",
      color: "from-red-600 to-red-800",
    },
    {
      title: "Diploma in Bakery & Pastry",
      subtitle: "",
      duration: "3 Months",
      age: "18 - Unlimited",
      eligibility: "12th & above",
      placement: "Various Opportunities",
      color: "from-blue-800 to-blue-900",
    },
  ];

  const features = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "100% Placement",
      desc: "World class career opportunities",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Expert Faculty",
      desc: "Industry professionals",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Global Network",
      desc: "40+ shipping companies",
    },
    {
      icon: <Ship className="w-8 h-8" />,
      title: "Cruise Ship Jobs",
      desc: "International exposure",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Multicultural",
      desc: "Diverse work force",
    },
    {
      icon: <Clock className="w-8 h-8" />,
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
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">RB</span>
              </div>
              <div>
                <h1
                  className={`text-xl font-bold ${
                    scrolled ? "text-blue-900" : "text-white"
                  }`}
                >
                  Royal <span className="text-red-600">British</span>
                </h1>
                <p
                  className={`text-xs ${
                    scrolled ? "text-gray-600" : "text-gray-200"
                  }`}
                >
                  International School
                </p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {["Home", "Courses", "About", "Facilities", "Contact"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className={`${
                      scrolled
                        ? "text-gray-700 hover:text-blue-600"
                        : "text-white hover:text-gray-200"
                    } font-medium transition-colors`}
                  >
                    {item}
                  </a>
                )
              )}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden ${
                scrolled ? "text-gray-700" : "text-white"
              }`}
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
          <div className="md:hidden bg-white shadow-lg">
            <div className="px-4 pt-2 pb-4 space-y-2">
              {["Home", "Courses", "About", "Facilities", "Contact"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                )
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-red-900">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-400 rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-1000"></div>
          </div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl">
          <div className="mb-8 animate-fade-in">
            <div className="inline-block p-4 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
              <Clock className="w-16 h-16 text-white mx-auto" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-up">
            Shape Your Future in
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
              Hospitality Industry
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-slide-up delay-200">
            6 Months Professional Training • 100% Placement • International
            Opportunities
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up delay-300">
            <a
              href="#courses"
              className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transform transition-all shadow-2xl hover:shadow-red-500/50"
            >
              Explore Courses
            </a>
            <a
              href="#contact"
              className="bg-white text-blue-900 px-8 py-4 rounded-full font-semibold hover:scale-105 transform transition-all shadow-2xl"
            >
              Apply Now
            </a>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-white">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400">10%</div>
              <div className="text-sm">Discount Offer</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400">100%</div>
              <div className="text-sm">Placement</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400">40+</div>
              <div className="text-sm">Companies</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white" />
        </div>
      </section>

      {/* Special Offers Banner */}
      <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-lg font-bold animate-pulse">
            🎉 Limited Time Offer: 10% OFF on Institution Fee + 10% Discount on
            Check-in! 🎉
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-red-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Courses Offered
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Professional programs designed to launch your career in the
              hospitality industry
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, idx) => (
              <div
                key={idx}
                className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                ></div>

                <div className="p-8">
                  <div
                    className={`inline-block px-4 py-2 bg-gradient-to-r ${course.color} text-white rounded-full text-sm font-semibold mb-4`}
                  >
                    {course.duration}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  {course.subtitle && (
                    <p className="text-red-600 font-semibold mb-4">
                      {course.subtitle}
                    </p>
                  )}

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-5 h-5 mr-2 text-blue-600" />
                      <span>Duration: {course.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-5 h-5 mr-2 text-blue-600" />
                      <span>Age: {course.age}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                      <span>Eligibility: {course.eligibility}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Ship className="w-5 h-5 mr-2 text-blue-600" />
                      <span>Placement: {course.placement}</span>
                    </div>
                  </div>

                  <button
                    className={`w-full bg-gradient-to-r ${course.color} text-white py-3 rounded-full font-semibold hover:scale-105 transform transition-all`}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section
        id="facilities"
        className="py-20 bg-gradient-to-br from-blue-50 to-red-50"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Student Facilities
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-red-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
                <Award className="w-8 h-8 mr-3 text-blue-600" />
                STCW Class (21 Days)
              </h3>
              <ul className="space-y-3">
                {benefits.slice(0, 5).map((benefit, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
                <BookOpen className="w-8 h-8 mr-3 text-blue-600" />
                Study Rooms (90 Days)
              </h3>
              <ul className="space-y-3">
                {benefits.slice(5).map((benefit, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-900 to-red-900 p-8 rounded-2xl shadow-xl text-white">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Ship className="w-8 h-8 mr-3" />
              Contract Period - Permanent Contract
            </h3>
            <ul className="grid md:grid-cols-2 gap-4">
              {requirements.map((req, idx) => (
                <li key={idx} className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3 text-yellow-400" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Promise
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-red-600 mb-6"></div>
              <p className="text-lg text-gray-700 mb-6">
                The Royal British International School training leads by doing
                the right things in the right way. We enable everyone to perform
                at their best while challenging ourselves to responsibly shape
                the industry and make a positive impact in our communities.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                We value diversity and provide an inclusive environment for our
                people, regardless of their race, ethnicity, nationality,
                gender, age, sexual orientation, faith or political beliefs.
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Star className="w-6 h-6 mr-3 text-yellow-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">
                    Expert Lecturers & Industry Exposure
                  </p>
                </div>
                <div className="flex items-start">
                  <Star className="w-6 h-6 mr-3 text-yellow-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">Line Training & Placements</p>
                </div>
                <div className="flex items-start">
                  <Star className="w-6 h-6 mr-3 text-yellow-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">
                    Student Success & Future Development
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-2xl text-white shadow-xl">
                  <Globe className="w-12 h-12 mb-4" />
                  <div className="text-3xl font-bold mb-2">40+</div>
                  <div className="text-sm">Shipping Companies</div>
                </div>
                <div className="bg-gradient-to-br from-red-600 to-red-800 p-6 rounded-2xl text-white shadow-xl mt-8">
                  <Users className="w-12 h-12 mb-4" />
                  <div className="text-3xl font-bold mb-2">5</div>
                  <div className="text-sm">Countries Network</div>
                </div>
                <div className="bg-gradient-to-br from-blue-800 to-blue-900 p-6 rounded-2xl text-white shadow-xl">
                  <Award className="w-12 h-12 mb-4" />
                  <div className="text-3xl font-bold mb-2">100%</div>
                  <div className="text-sm">Placement Rate</div>
                </div>
                <div className="bg-gradient-to-br from-red-800 to-red-900 p-6 rounded-2xl text-white shadow-xl mt-8">
                  <BookOpen className="w-12 h-12 mb-4" />
                  <div className="text-3xl font-bold mb-2">World</div>
                  <div className="text-sm">Class Faculty</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-br from-blue-900 to-red-900 text-white"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
            <div className="w-24 h-1 bg-white mx-auto mb-4"></div>
            <p className="text-gray-200 max-w-2xl mx-auto">
              Ready to start your journey? Contact us today for more information
              or to schedule a visit
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-white/10 p-4 rounded-full">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Phone</h3>
                  <p className="text-gray-200">833 1086 333</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-white/10 p-4 rounded-full">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-gray-200">enquiry@royalbritish.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-white/10 p-4 rounded-full">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Address</h3>
                  <p className="text-gray-200">
                    Plot No. Rm Trinity Art, Visakalakshi Nagar
                    <br />
                    Vetrinary Colony, Visakhapatnam - 530040
                    <br />
                    A.P. India
                  </p>
                </div>
              </div>

              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6">Application Form</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:border-white/40"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:border-white/40"
                />
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:border-white/40"
                />
                <select className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-white/40">
                  <option value="" className="bg-blue-900">
                    Select Course
                  </option>
                  <option value="dhm" className="bg-blue-900">
                    Bakery & Pastry International DHM
                  </option>
                  <option value="diploma" className="bg-blue-900">
                    Bakery & Pastry International Diploma
                  </option>
                  <option value="basic" className="bg-blue-900">
                    Diploma in Bakery & Pastry
                  </option>
                </select>
                <textarea
                  placeholder="Message (Optional)"
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:border-white/40"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-white text-blue-900 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-xl mb-4">Royal British</h4>
              <p className="text-gray-400">
                Building trust, driving performance, and shaping a better
                future.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Vision & Values</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Be Kind</li>
                <li>Be Respectful</li>
                <li>Be Responsible</li>
                <li>Work Hard</li>
                <li>Have Fun</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#courses" className="hover:text-white">
                    Courses
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#facilities" className="hover:text-white">
                    Facilities
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Leave a Review</h4>
              <div className="flex space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-400 text-sm">
                Share your experience with us!
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>
              &copy; 2024 Royal British International School. A unit of Royal
              British Private Limited.
            </p>
            <p className="mt-2">www.royalbritish.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RoyalBritishBakery;
