import { Outlet } from 'react-router-dom'

/**
 * Vista mínima para invitados: solo el formulario de recuerdos, sin navegación ni secciones extra.
 */
export default function GuestUploadLayout() {
  return (
    <div className="relative min-h-svh overflow-x-hidden bg-wonder-night text-rose-50">
      <main className="flex min-h-svh w-full flex-col justify-start py-4 md:py-6">
        <Outlet />
      </main>
    </div>
  )
}
