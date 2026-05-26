import About from "./components/sections/about/About";
import Hero from "./components/sections/hero/Hero";
import Works from "./components/sections/works/Works";

export default function Home() {
  return (
    <div>
      <Hero />
      <About/>
      <Works />
    </div>
  );
}
