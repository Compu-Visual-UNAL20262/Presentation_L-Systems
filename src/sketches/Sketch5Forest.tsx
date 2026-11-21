import P5Canvas from '../components/P5Canvas'
import sketch5 from './Sketch5'

/**
 * Sketch 5 — Bosque estocástico + prueba de estrés (placeholder).
 *
 * Envoltura de componente sobre el sketch funcional existente, para que
 * encaje en el registro uniforme de sketches. Pendiente de reemplazo por la
 * versión interactiva final con botón "Regenerar" y selector de iteraciones.
 */
export default function Sketch5Forest() {
  return (
    <div className="relative h-full w-full">
      <P5Canvas sketch={sketch5} />
    </div>
  )
}
