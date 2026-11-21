import type { ComponentType } from 'react'
import type { Slide, SlideComponentId } from '../data/slidesConfig'
import {
  Slide02Cover,
  Slide03History,
  Slide04Parallel,
  Slide05Ingredients,
  Slide06Algae,
  Slide08Turtle,
  Slide10Stack,
  Slide11EdgeNode,
  Slide13Levels,
  Slide14Dice,
  Slide16Phototropism,
  Slide17Exponential,
  Slide19ThreeD,
  Slide20Applications,
} from './concepts'
import {
  Slide01Hook,
  Slide07AlgaeSketch,
  Slide09KochSketch,
  Slide12PlantSketch,
  Slide15ForestSketch,
  Slide18StressSketch,
  Slide21Closing,
} from './sketchSlides'

/**
 * Registro que asocia cada identificador de componente del flujo con su
 * componente React. El SlideDeck monta solo el slide activo, así los sketches
 * inactivos se desmontan (p.remove()) sin consumir CPU.
 */
const REGISTRY: Record<SlideComponentId, ComponentType> = {
  'sketch-hook': Slide01Hook,
  cover: Slide02Cover,
  history: Slide03History,
  parallel: Slide04Parallel,
  ingredients: Slide05Ingredients,
  'algae-diagram': Slide06Algae,
  'sketch-algae': Slide07AlgaeSketch,
  turtle: Slide08Turtle,
  'sketch-koch': Slide09KochSketch,
  stack: Slide10Stack,
  'edge-node': Slide11EdgeNode,
  'sketch-plant': Slide12PlantSketch,
  levels: Slide13Levels,
  dice: Slide14Dice,
  'sketch-forest': Slide15ForestSketch,
  phototropism: Slide16Phototropism,
  exponential: Slide17Exponential,
  'sketch-stress': Slide18StressSketch,
  'three-d': Slide19ThreeD,
  applications: Slide20Applications,
  closing: Slide21Closing,
}

export default function SlideView({ slide }: { slide: Slide }) {
  const Component = REGISTRY[slide.component]
  return <Component />
}
