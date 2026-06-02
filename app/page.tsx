import Hero from "./components/sections/hero/Hero";
import About from "./components/sections/about/About";
import Works from "./components/sections/works/Works";
import Specialties from "./components/sections/specialties/Specialties";
;

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <Specialties />
      {/* <CallToAction /> */}
      <Works />
      {/* <Contact /> */}
    </div>
  );
}
