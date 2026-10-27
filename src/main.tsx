import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Dismiss the pre-React boot screen: hold it ~0.7s so the animation reads,
// fade it out, then remove it from the DOM. It lives outside #root, so
// React never wipes it — and it stays up (with the error box) if JS fails.
const loader = document.getElementById('loader')

if (loader) {
  window.setTimeout(() => {
    loader.classList.add('is-done')
    window.setTimeout(() => loader.remove(), 700)
  }, 700)
}
