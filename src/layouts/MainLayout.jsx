import { Outlet } from 'react-router-dom'
import AnimatedBackground from '../components/AnimatedBackground'
import SoftParticles from '../components/effects/SoftParticles'
import Navbar from '../components/Navbar'

export default function MainLayout() {
  return (
    <div className="relative min-h-svh overflow-x-hidden">
      <AnimatedBackground />
      <SoftParticles />
      <div className="relative z-10 flex min-h-svh flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <footer className="relative z-10 border-t border-white/5 bg-wonder-night/40 px-4 py-8 text-center text-sm text-rose-100/50 backdrop-blur-sm">
          <p className="font-display text-xs tracking-[0.25em] text-wonder-gold-soft/80">
            Wonderland XV
          </p>
          <p className="mt-2 font-body italic">Una noche fuera del tiempo.</p>
        </footer>
      </div>
    </div>
  )
}
