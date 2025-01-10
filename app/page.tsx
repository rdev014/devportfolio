
import AboutMe from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Experience from "./components/Experience/Experience";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects/Projects";
import Skills from "./components/Skills/Skills";



export default function Home() {
  return (
 <>
<Navbar/>
<Hero/>
<AboutMe/>
<Skills/>
<Projects/>
<Experience/>
<Contact/>

 </>
  );
}
