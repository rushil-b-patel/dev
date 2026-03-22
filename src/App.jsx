import Quote from "./components/Quote";
import Skills from "./components/Stack";
import { ThemeToggle } from "./components/ThemeToggle";
import Experience from "./pages/Experience";
import Intro from "./pages/Intro";
import Projects from "./pages/Projects";

export default function App() {
  return (
    <main className="min-h-screen px-6 py-16">
      <ThemeToggle />
      <div className="max-w-2xl mx-auto">
        <Intro />
        <Skills />
        <Experience />
        <Projects />
        <Quote />
      </div>
    </main>
  )
}
