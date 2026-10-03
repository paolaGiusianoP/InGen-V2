import React, { useState, useCallback } from 'react'
import HeroRustic from './components/HeroRustic'
import { Edge } from './components/Edge'
import { PageTransition } from './components/PageTransition'
import { Navbar } from './components/Navbar'
import { Preloader } from './components/Preloader'
import { ScrollProgress } from './components/ScrollProgress'
import { Concept } from './components/Concept'
import { Menu } from './components/Menu'
import { Gallery } from './components/Gallery'
import { Reservation } from './components/Reservation'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { WhatsAppFloat } from './components/WhatsAppFloat'

const Joined = ({ fill, burn, seed, className = '', children }) => (
  <div className={`relative isolate ${className}`} style={{ background: fill }}>
    <Edge fill={fill} burn={burn} seed={seed} />
    {children}
  </div>
)

function App() {
  const [ready, setReady] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const onLift = useCallback(() => setReady(true), [])
  const onDone = useCallback(() => setLoaded(true), [])

  return (
    <div className="min-h-screen bg-ink-950 font-sans text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      {!loaded && <Preloader onLift={onLift} onDone={onDone} />}
      <PageTransition />
      <Navbar />
      <ScrollProgress />

      <main>
        <HeroRustic ready={ready} />
        <Joined fill="#261a11" burn seed={11}><Concept /></Joined>
        <div className="relative"><Edge fill="#eee2c9" seed={23} /><Menu /></div>
        <Joined fill="#261a11" burn seed={5}><Gallery /></Joined>
        <Reservation />
        <div className="relative"><Edge fill="#eee2c9" seed={41} /><Contact /></div>
      </main>

      <div className="relative"><Edge fill="#1b130d" burn seed={17} /><Footer /></div>
      <WhatsAppFloat />
    </div>
  )
}

export default App
