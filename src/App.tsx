import { useEffect, useState } from 'react'
import ClickSpark from './components/ClickSpark/ClickSpark'
import Noise from './components/Noise/Noise'
import CursorFX from './components/site/CursorFX'
import BootScreen from './components/site/BootScreen'
import Navbar from './components/site/Navbar'
import Hero from './components/site/Hero'
import Stats from './components/site/Stats'
import Projects from './components/site/Projects'
import Skills from './components/site/Skills'
import About from './components/site/About'
import Footer from './components/site/Footer'

// NOTE: this site has no router — navigation is anchor-based (#top, #projects,
// #skills, #about, #connect), so NotFound is not rendered by App.tsx.
// src/components/site/NotFound.tsx is a self-contained 404 page, ready to import.
// If react-router (or similar) is added later, wire it in as the wildcard route,
// e.g.:
//
//   import NotFound from './components/site/NotFound'
//   <Route path="*" element={<NotFound />} />
//
// Static hosts (Netlify / Vercel / GitHub Pages) also get public/404.html directly.

function App() {
  const [booted, setBooted] = useState(false)

  // The #boot shell in index.html only covers the pre-React gap. Once the real
  // boot overlay (Waves canvas et al) is rendered, drop the shell.
  useEffect(() => {
    document.getElementById('boot')?.remove()
  }, [])

  return (
    <>
      {!booted && <BootScreen onDone={() => setBooted(true)} />}
      <Navbar />
      <ClickSpark sparkColor="#a9a3d8" sparkSize={11} sparkRadius={30} sparkCount={9}>
        <main>
          <Hero />
          <Stats />
          <Projects />
          <Skills />
          <About />
        </main>
      </ClickSpark>
      <Noise patternAlpha={7} patternRefreshInterval={3} className="z-[70] opacity-60 mix-blend-soft-light" />
      <CursorFX />
      <Footer />
    </>
  )
}

export default App
