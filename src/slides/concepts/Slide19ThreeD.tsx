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
      <div className="flex w-full max-w-4xl flex-col items-center gap-4">
        <div className="grid w-full gap-4 sm:grid-cols-2">
          {/* Avión/tortuga 3D con ejes */}
          <div className="pixel-bevel bg-white p-5 text-center">
            <svg viewBox="0 0 160 120" className="mx-auto h-28 animate-float-y sm:h-36">
              {/* Ejes con trazos gruesos legibles */}
              <path d="M80 72 L80 16" stroke="#15803D" strokeWidth="2.5" strokeDasharray="4 3" />
              <path d="M80 72 L144 72" stroke="#D97706" strokeWidth="2.5" strokeDasharray="4 3" />
              <path d="M80 72 L26 102" stroke="#DB2777" strokeWidth="2.5" strokeDasharray="4 3" />
              {/* Avión de papel con borde oscuro */}
              <path
                d="M80 28 L122 90 L80 72 L38 90 Z"
                fill="#38BDF8"
                stroke="#0F172A"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <path d="M80 28 L80 72" stroke="#0F172A" strokeWidth="2" />
            </svg>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              <AxisChip label="Yaw (+/−)" pillBg="bg-[#A3E635]" />
              <AxisChip label="Pitch (&/^)" pillBg="bg-[#FACC15]" />
              <AxisChip label="Roll (\\/)" pillBg="bg-[#F472B6]" />
            </div>
          </div>

          {/* Línea 1D → cilindro con hojas */}
          <div className="pixel-bevel bg-white p-5 text-center">
            <svg viewBox="0 0 160 120" className="mx-auto h-28 sm:h-36">
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
          aspect="640 / 278"
          mobileMaxH="max-h-28"
          className="w-full max-w-2xl"
        />
      </div>
    </ConceptFrame>
  )
}
