import Navbar from './pages/Navbar'
import Hero from './components/Hero'
import TechStack from './components/TechStack'
import Experience from './pages/Experience'
import Projects from './pages/Projects'
import Github from './pages/Github'

export default function App() {
  return (
    <div className='selection:bg-[#adadadab] dark:selection:bg-[#4f4f4f] min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-300'>
      <Navbar />
      <main className="pt-20">
        <Hero />
        <TechStack />
        <section id="experience" className="py-10">
           <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-16">Experience</h2>
           <Experience />
        </section>
        <section id="github" className="py-10">
           <Github />
        </section>
        <section id="projects" className="py-10">
           <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-16">Projects</h2>
           <Projects />
        </section>
      </main>
    </div>
  )
}
