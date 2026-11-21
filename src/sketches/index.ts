import type { ComponentType } from 'react'
import Sketch1Tree from './Sketch1Tree'
import Sketch2Algae from './Sketch2Algae'
import Sketch3Koch from './Sketch3Koch'
import Sketch4Branch from './Sketch4Branch'
import Sketch5Forest from './Sketch5Forest'

/** Identificadores estables para referenciar sketches desde slidesConfig. */
export type SketchId = 'sketch1' | 'sketch2' | 'sketch3' | 'sketch4' | 'sketch5'

/**
 * Props que cualquier sketch puede recibir. `initialForestMode` solo lo usa
 * Sketch1 (slide de cierre); el resto lo ignora.
 */
export interface SketchProps {
  initialForestMode?: boolean
}

/**
 * Registro central de sketches. Cada entrada es un componente React
 * autónomo que monta su propio <P5Canvas> (Instance Mode) y sus controles.
 */
export const sketches: Record<SketchId, ComponentType<SketchProps>> = {
  sketch1: Sketch1Tree,
  sketch2: Sketch2Algae,
  sketch3: Sketch3Koch,
  sketch4: Sketch4Branch,
  sketch5: Sketch5Forest,
}
