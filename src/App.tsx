import ClickSpark from './components/ClickSpark/ClickSpark'
import Noise from './components/Noise/Noise'
import Navbar from './components/site/Navbar'
import Hero from './components/site/Hero'
import Stats from './components/site/Stats'
import Projects from './components/site/Projects'
import Skills from './components/site/Skills'
import About from './components/site/About'
import Footer from './components/site/Footer'

function App() {
  return (
    <>
      <Navbar />
      <ClickSpark sparkColor="#8de9ff" sparkSize={11} sparkRadius={30} sparkCount={9}>
        <main>
          <Hero />
          <Stats />
          <Projects />
          <Skills />
          <About />
        </main>
      </ClickSpark>
      <Noise patternAlpha={7} patternRefreshInterval={3} className="z-[70] opacity-60 mix-blend-soft-light" />
      <Footer />
    </>
  )
}

export default App
