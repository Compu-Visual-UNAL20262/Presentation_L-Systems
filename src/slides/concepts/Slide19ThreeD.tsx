import { ConceptFrame } from './shared'
import PixelPhoto from '../../components/PixelPhoto'
import tree3d from '../../assets/tree-3d.webp'

/**
 * Slide 19 — Del Plano 2D al Mundo 3D.
 * Tortuga/avión con los 3 ejes de rotación + transición línea → cilindro.
 */

function AxisChip({ label, pillBg }: { label: string; pillBg: string }) {
  return (
    <span
      className={`pixel-bevel-sm ${pillBg} px-2.5 py-1 font-pixel text-[10px] font-bold uppercase tracking-widest text-[#0F172A]`}
    >
      {label}
    </span>
  )
}

export default function Slide19ThreeD() {
  return (
    <ConceptFrame badge="ACTO V" accent="cyan" title="Del Plano 2D al Mundo 3D">
      <div className="flex h-full w-full max-w-4xl flex-col items-center gap-3 sm:gap-4">
        <div className="grid w-full shrink-0 gap-3 sm:grid-cols-2 sm:gap-4">
          {/* Avión/tortuga 3D con base ortonormal H, L, U que rota en vivo */}
          <div className="pixel-bevel bg-white p-3 text-center sm:p-5">
            <div
              className="mx-auto flex h-20 items-center justify-center sm:h-32"
              style={{ perspective: '320px' }}
            >
              <svg
                viewBox="0 0 160 120"
                className="h-full animate-turtle-3d"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Base ortonormal: Heading (frontal), Left, Up */}
                {/* U (arriba) — verde */}
                <path d="M80 72 L80 14" stroke="#15803D" strokeWidth="3" />
                <path d="M80 14 l-4 7 l8 0 z" fill="#15803D" />
                <text x="86" y="18" fill="#15803D" fontSize="12" fontWeight="bold">U</text>
                {/* H (frontal) — cian */}
                <path d="M80 72 L146 72" stroke="#0284C7" strokeWidth="3" />
                <path d="M146 72 l-7 -4 l0 8 z" fill="#0284C7" />
                <text x="138" y="88" fill="#0284C7" fontSize="12" fontWeight="bold">H</text>
                {/* L (izquierda) — magenta */}
                <path d="M80 72 L22 100" stroke="#DB2777" strokeWidth="3" />
                <path d="M22 100 l8 1 l-3 -7 z" fill="#DB2777" />
                <text x="12" y="100" fill="#DB2777" fontSize="12" fontWeight="bold">L</text>
                {/* Avión de papel (la tortuga 3D) */}
                <path
                  d="M80 30 L120 88 L80 72 L40 88 Z"
                  fill="#38BDF8"
                  stroke="#0F172A"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <path d="M80 30 L80 72" stroke="#0F172A" strokeWidth="2" />
              </svg>
            </div>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              <AxisChip label="Yaw (+/−) → U" pillBg="bg-[#A3E635]" />
              <AxisChip label="Pitch (&/^) → L" pillBg="bg-[#FACC15]" />
              <AxisChip label="Roll (\\//) → H" pillBg="bg-[#F472B6]" />
            </div>
          </div>

          {/* Línea 1D → cilindro con hojas */}
          <div className="pixel-bevel bg-white p-3 text-center sm:p-5">
            <svg viewBox="0 0 160 120" className="mx-auto h-20 sm:h-32">
              {/* línea delgada */}
              <line x1="30" y1="100" x2="30" y2="24" stroke="#0F172A" strokeWidth="2.5" />
              {/* flecha */}
              <path d="M56 62 H78" stroke="#0284C7" strokeWidth="3" />
              <path d="M76 55 l9 7 l-9 7" fill="none" stroke="#0284C7" strokeWidth="3" />
              {/* cilindro */}
              <path
                d="M104 100 L104 30 a12 5 0 0 0 24 0 L128 100 a12 5 0 0 1 -24 0"
                fill="#854D0E"
                stroke="#0F172A"
                strokeWidth="2"
              />
              <ellipse cx="116" cy="30" rx="12" ry="5" fill="#A3E635" stroke="#0F172A" strokeWidth="2" />
              {/* hojas instanciadas */}
              {[
                [98, 36],
                [134, 44],
                [100, 60],
              ].map(([cx, cy], i) => (
                <circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r="6"
                  fill="#22C55E"
                  stroke="#0F172A"
                  strokeWidth="2"
                  className="animate-float-y"
                  style={{ animationDelay: `${i * 0.4}s` }}
                />
              ))}
            </svg>
            <p className="mt-2 font-display text-xs font-bold text-[#0F172A]">
              Líneas → cilindros + hojas instanciadas (GPU)
            </p>
          </div>
        </div>

        {/* Render real: wireframe del esqueleto L-System → mallas con hojas */}
        <PixelPhoto
          src={tree3d}
          alt="Árbol 3D: del esqueleto wireframe a la malla con hojas instanciadas"
          caption="Del esqueleto (wireframe) al follaje volumétrico"
          credit="Render 3D · ericchadwick.com"
          fill
          className="min-h-0 w-full max-w-2xl flex-1"
        />
      </div>
    </ConceptFrame>
  )
}
