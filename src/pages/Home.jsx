import Hero from "../components/Hero";

const Home = () => {
  return (
    <main>
      <Hero />
      <section className="py-8 container mx-auto px-4">
        <p className="text-center text-lg text-gray-700 dark:text-gray-300">
          Welcome to Royal British International School — we offer world-class
          training in Bakery & Pastry.
        </p>
      </section>
    </main>
  );
};

export default Home;
