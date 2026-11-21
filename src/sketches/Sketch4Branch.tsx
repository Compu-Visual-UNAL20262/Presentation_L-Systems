import P5Canvas from '../components/P5Canvas'
import sketch4 from './Sketch4'

/**
 * Sketch 4 — Planta ramificada con corchetes [ ] (placeholder).
 *
 * Envoltura de componente sobre el sketch funcional existente, para que
 * encaje en el registro uniforme de sketches. Pendiente de reemplazo por la
 * versión interactiva final con sliders en pantalla (marcados data-no-swipe).
 */
export default function Sketch4Branch() {
  return (
    <div className="relative h-full w-full">
      <P5Canvas sketch={sketch4} />
    </div>
  )
}
