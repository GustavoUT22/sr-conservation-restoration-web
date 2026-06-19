import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Works from "@/components/sections/Works";
import Specialties from "@/components/sections/Specialties";

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
