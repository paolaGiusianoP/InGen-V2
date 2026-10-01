import React, { useRef, useState, useCallback } from 'react'
import Hero from './components/Hero'
import { Navbar } from './components/Navbar'
import { Preloader } from './components/Preloader'
import { Concept } from './components/Concept'
import { Menu } from './components/Menu'
import { Gallery } from './components/Gallery'
import { Reservation } from './components/Reservation'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { WhatsAppFloat } from './components/WhatsAppFloat'
import { useMeniscus } from './hooks/useMeniscus'

const Curve = ({ children, className = '' }) => {
  const ref = useRef(null)
  useMeniscus(ref)
  return (
    <div ref={ref} className={`isolate overflow-hidden ${className}`}>
      {children}
    </div>
  )
}

function App() {
  const [ready, setReady] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const onLift = useCallback(() => setReady(true), [])
  const onDone = useCallback(() => setLoaded(true), [])

  return (
    <div className="min-h-screen bg-[#0a0f0d] font-sans text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      {!loaded && <Preloader onLift={onLift} onDone={onDone} />}

      <Navbar />

      <main>
        <Hero ready={ready} />
        <Curve className="-mt-10 bg-[#121915]">
          <Concept />
        </Curve>
        <Menu />
        <Curve className="bg-[#121915]">
          <Gallery />
        </Curve>
        <Reservation />
        <Contact />
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}

export default App
