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
  Slide16Phototropism,
  Slide17Exponential,
  Slide19ThreeD,
  Slide20Applications,
  Slide22Bibliography,
} from './concepts'
import {
  Slide01Hook,
  Slide07AlgaeSketch,
  Slide09KochSketch,
  Slide12PlantSketch,
  Slide15ForestSketch,
  SlideContextSketch,
  SlideParametricSketch,
  SlideFractalZoomSketch,
  SlideFernSketch,
  SlideSandboxSketch,
  SlideCompareSketch,
  SlideRewriteSketch,
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
  'sketch-rewrite': SlideRewriteSketch,
  turtle: Slide08Turtle,
  'fractal-zoom': SlideFractalZoomSketch,
  'sketch-koch': Slide09KochSketch,
  fern: SlideFernSketch,
  stack: Slide10Stack,
  'edge-node': Slide11EdgeNode,
  'sketch-plant': Slide12PlantSketch,
  'sketch-sandbox': SlideSandboxSketch,
  levels: Slide13Levels,
  'sketch-forest': Slide15ForestSketch,
  'sketch-compare': SlideCompareSketch,
  'sketch-context': SlideContextSketch,
  'sketch-parametric': SlideParametricSketch,
  phototropism: Slide16Phototropism,
  exponential: Slide17Exponential,
  'sketch-stress': Slide18StressSketch,
  'three-d': Slide19ThreeD,
  applications: Slide20Applications,
  closing: Slide21Closing,
  bibliography: Slide22Bibliography,
}

export default function SlideView({ slide }: { slide: Slide }) {
  const Component = REGISTRY[slide.component]
  return <Component />
}
