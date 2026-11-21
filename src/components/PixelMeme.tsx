import { useState } from 'react'

export type MemeVariant = 'parallel' | 'clones' | 'exponential' | 'rocket'

interface PixelMemeProps {
  variant: MemeVariant
  caption?: string
  className?: string
}

const MEME_CONFIG: Record<
  MemeVariant,
  {
    tag: string
    gifUrl: string
    alt: string
    headerBg: string
  }
> = {
  parallel: {
    tag: 'CHOMSKY_VS_LSYSTEM.GIF',
    gifUrl: 'https://media.giphy.com/media/ukMiDlCmdv2og/giphy.gif',
    alt: 'Chomsky secuencial vs L-System paralelo',
    headerBg: 'bg-[#38BDF8]',
  },
  clones: {
    tag: 'CLONES_VS_RNG.GIF',
    gifUrl: 'https://media.giphy.com/media/l36kU80xPf0ojG0Erg/giphy.gif',
    alt: 'Clones idénticos vs dados estocásticos',
    headerBg: 'bg-[#F472B6]',
  },
  exponential: {
    tag: 'N_EQUALS_10_GPU.GIF',
    gifUrl: 'https://media.giphy.com/media/QMHoU66sBXqqLqYvGO/giphy.gif',
    alt: 'Cuando subes a n=10 iteraciones: This is fine',
    headerBg: 'bg-[#FACC15]',
  },
  rocket: {
    tag: 'TEAM_GAYMERS.GIF',
    gifUrl: 'https://media.giphy.com/media/37zCgyDV7pPos/giphy.gif',
    alt: 'Equipo Gaymers despegando a la velocidad de los fractales',
    headerBg: 'bg-[#A3E635]',
  },
}

/**
 * Escenas SVG pixel-art animadas 100 % autocontenidas.
 * Actúan como fallback instantáneo a prueba de fallos de red en el salón
 * (y se pueden alternar con un clic frente al GIF).
 */
function AnimatedMemeFallback({ variant }: { variant: MemeVariant }) {
  if (variant === 'parallel') {
    return (
      <svg
        viewBox="0 0 280 96"
        className="h-full w-full"
        role="img"
        aria-label="Animación pixel: cola secuencial vs explosión paralela"
      >
        <rect width="280" height="96" fill="#E0F2FE" />
        {/* Divisor central */}
        <line x1="140" y1="6" x2="140" y2="90" stroke="#0F172A" strokeWidth="2.5" strokeDasharray="4 4" />

        {/* Izquierda: Chomsky en fila esperando turno */}
        <text x="70" y="18" textAnchor="middle" fill="#0F172A" fontFamily="Silkscreen, monospace" fontSize="8">
          1x1 (FILA LENTA)
        </text>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${24 + i * 34}, 32)`}>
            <rect
              width="24"
              height="24"
              rx="3"
              fill={i === 0 ? '#FACC15' : '#CBD5E1'}
              stroke="#0F172A"
              strokeWidth="2"
            />
            <text x="12" y="16" textAnchor="middle" fill="#0F172A" fontFamily="JetBrains Mono, monospace" fontWeight="bold" fontSize="10">
              {i === 0 ? 'A!' : 'zZ'}
            </text>
          </g>
        ))}
        <text x="70" y="78" textAnchor="middle" fill="#334155" fontFamily="JetBrains Mono, monospace" fontSize="8">
          esperando turno...
        </text>

        {/* Derecha: L-System (todas las células a la vez) */}
        <text x="210" y="18" textAnchor="middle" fill="#15803D" fontFamily="Silkscreen, monospace" fontSize="8">
          ¡TODAS AL TIEMPO!
        </text>
        {[0, 1, 2, 3].map((i) => (
          <g
            key={i}
            className="animate-float-y"
            style={{ animationDelay: `${i * 0.12}s` }}
            transform={`translate(${154 + i * 28}, 30)`}
          >
            <rect
              width="22"
              height="26"
              rx="4"
              fill={i % 2 === 0 ? '#A3E635' : '#38BDF8'}
              stroke="#0F172A"
              strokeWidth="2"
            />
            <text x="11" y="17" textAnchor="middle" fill="#0F172A" fontFamily="JetBrains Mono, monospace" fontWeight="bold" fontSize="9">
              AB
            </text>
          </g>
        ))}
        <text x="210" y="78" textAnchor="middle" fill="#0F172A" fontFamily="Silkscreen, monospace" fontSize="8">
          ★ MODO GAYMER ★
        </text>
      </svg>
    )
  }

  if (variant === 'clones') {
    return (
      <svg
        viewBox="0 0 280 96"
        className="h-full w-full"
        role="img"
        aria-label="Meme Spider-Man de árboles clones vs dados RNG"
      >
        <rect width="280" height="96" fill="#FCE7F3" />
        {/* Dos árboles clones señalándose como el meme de Spider-Man */}
        <g transform="translate(26, 14)">
          <rect x="16" y="42" width="8" height="22" fill="#854D0E" stroke="#0F172A" strokeWidth="2" />
          <polygon points="20,6 4,44 36,44" fill="#22C55E" stroke="#0F172A" strokeWidth="2" />
          {/* Brazo señalando a la derecha */}
          <line x1="34" y1="32" x2="56" y2="32" stroke="#0F172A" strokeWidth="3" />
          <polygon points="56,28 64,32 56,36" fill="#FACC15" stroke="#0F172A" strokeWidth="1.5" />
        </g>

        <g transform="translate(100, 14)">
          <rect x="16" y="42" width="8" height="22" fill="#854D0E" stroke="#0F172A" strokeWidth="2" />
          <polygon points="20,6 4,44 36,44" fill="#22C55E" stroke="#0F172A" strokeWidth="2" />
          {/* Brazo señalando a la izquierda */}
          <line x1="6" y1="32" x2="-14" y2="32" stroke="#0F172A" strokeWidth="3" />
          <polygon points="-14,28 -22,32 -14,36" fill="#FACC15" stroke="#0F172A" strokeWidth="1.5" />
        </g>

        <text x="84" y="90" textAnchor="middle" fill="#0F172A" fontFamily="Silkscreen, monospace" fontSize="7.5">
          CTRL+C / CTRL+V
        </text>

        <line x1="164" y1="8" x2="164" y2="88" stroke="#0F172A" strokeWidth="2" strokeDasharray="3 3" />

        {/* Dado RNG brillante */}
        <g transform="translate(186, 16)" className="animate-float-y">
          <rect x="0" y="0" width="46" height="46" rx="6" fill="#FACC15" stroke="#0F172A" strokeWidth="2.5" />
          <circle cx="13" cy="13" r="3.5" fill="#0F172A" />
          <circle cx="33" cy="13" r="3.5" fill="#0F172A" />
          <circle cx="23" cy="23" r="3.5" fill="#BE185D" />
          <circle cx="13" cy="33" r="3.5" fill="#0F172A" />
          <circle cx="33" cy="33" r="3.5" fill="#0F172A" />
        </g>
        <text x="252" y="44" textAnchor="middle" fill="#BE185D" fontFamily="Silkscreen, monospace" fontSize="9">
          RNG!
        </text>
        <text x="222" y="88" textAnchor="middle" fill="#0F172A" fontFamily="Silkscreen, monospace" fontSize="7.5">
          40% / 40% / 20%
        </text>
      </svg>
    )
  }

  if (variant === 'exponential') {
    return (
      <svg
        viewBox="0 0 280 96"
        className="h-full w-full"
        role="img"
        aria-label="Meme This is Fine: PC en llamas con n=10 iteraciones"
      >
        <rect width="280" height="96" fill="#FEF3C7" />
        {/* Llamas pixeladas de fondo */}
        {[22, 62, 205, 244].map((x, i) => (
          <g key={i} className="animate-float-y" style={{ animationDelay: `${i * 0.2}s` }}>
            <polygon
              points={`${x},76 ${x + 12},34 ${x + 24},76`}
              fill="#F97316"
              stroke="#0F172A"
              strokeWidth="2"
            />
            <polygon points={`${x + 5},76 ${x + 12},48 ${x + 19},76`} fill="#FACC15" />
          </g>
        ))}

        {/* Monitor retro sufriendo */}
        <g transform="translate(96, 12)">
          <rect x="0" y="0" width="88" height="56" rx="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
          <rect x="6" y="6" width="76" height="40" fill="#FEE2E2" stroke="#0F172A" strokeWidth="2" />
          <text x="44" y="22" textAnchor="middle" fill="#DC2626" fontFamily="Silkscreen, monospace" fontSize="9">
            n = 10
          </text>
          <text x="44" y="36" textAnchor="middle" fill="#0F172A" fontFamily="JetBrains Mono, monospace" fontWeight="bold" fontSize="8">
            0.4 FPS · 🔥
          </text>
          <rect x="28" y="56" width="32" height="8" fill="#94A3B8" stroke="#0F172A" strokeWidth="2" />
        </g>

        <text x="140" y="88" textAnchor="middle" fill="#0F172A" fontFamily="Silkscreen, monospace" fontSize="8.5">
          &quot;THIS IS FINE&quot; — LA GPU
        </text>
      </svg>
    )
  }

  // variant === 'rocket'
  return (
    <svg
      viewBox="0 0 280 96"
      className="h-full w-full"
      role="img"
      aria-label="Emblema Equipo Gaymers estilo Equipo Rocket"
    >
      <rect width="280" height="96" fill="#ECFCCB" />
      {/* Franja arcoíris 16-bit */}
      <rect x="0" y="14" width="280" height="5" fill="#F43F5E" />
      <rect x="0" y="19" width="280" height="5" fill="#FACC15" />
      <rect x="0" y="24" width="280" height="5" fill="#22C55E" />
      <rect x="0" y="29" width="280" height="5" fill="#38BDF8" />
      <rect x="0" y="34" width="280" height="5" fill="#A855F7" />

      {/* Escudo central G de Gaymers */}
      <g transform="translate(112, 8)" className="animate-float-y">
        <rect x="0" y="0" width="56" height="52" rx="6" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" />
        <text x="28" y="37" textAnchor="middle" fill="#BE185D" fontFamily="Silkscreen, monospace" fontWeight="bold" fontSize="30">
          G
        </text>
      </g>

      <text x="140" y="76" textAnchor="middle" fill="#0F172A" fontFamily="Silkscreen, monospace" fontSize="8.5">
        ★ TEAM GAYMERS ★
      </text>
      <text x="140" y="90" textAnchor="middle" fill="#15803D" fontFamily="JetBrains Mono, monospace" fontWeight="bold" fontSize="8">
        ¡A la velocidad de los fractales!
      </text>
    </svg>
  )
}

export default function PixelMeme({ variant, caption, className = '' }: PixelMemeProps) {
  const cfg = MEME_CONFIG[variant]
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const [preferPixel, setPreferPixel] = useState(false)

  const showGif = loaded && !failed && !preferPixel

  return (
    <div
      data-no-swipe="true"
      className={`pixel-bevel bg-surface overflow-hidden select-none ${className}`}
    >
      {/* Barra superior estilo ventana 16-bit */}
      <div
        className={`flex items-center justify-between border-b-2 border-[#0F172A] px-2.5 py-1 ${cfg.headerBg}`}
      >
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 border border-[#0F172A] bg-[#FFFFFF]" />
          <span className="font-pixel text-[9px] font-bold tracking-wider text-[#0F172A]">
            {cfg.tag}
          </span>
        </div>
        {loaded && !failed && (
          <button
            type="button"
            onClick={() => setPreferPixel((v) => !v)}
            className="border border-[#0F172A] bg-white px-1.5 py-0.5 font-pixel text-[8px] text-[#0F172A] hover:bg-[#FACC15]"
            title="Alternar entre GIF y Arte Pixel-SVG"
          >
            {preferPixel ? 'VER GIF' : '16-BIT'}
          </button>
        )}
      </div>

      {/* Viewport con fallback garantizado en SVG/CSS animado */}
      <div className="relative flex h-24 sm:h-28 w-full items-center justify-center bg-[#F8FAFC] overflow-hidden">
        {!showGif && <AnimatedMemeFallback variant={variant} />}

        {!failed && (
          <img
            src={cfg.gifUrl}
            alt={cfg.alt}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={
              showGif
                ? 'h-full w-full object-cover'
                : 'pointer-events-none absolute h-0 w-0 opacity-0'
            }
          />
        )}
      </div>

      {caption && (
        <div className="border-t-2 border-[#0F172A] bg-[#FFFBEB] px-2.5 py-1 text-center font-mono text-[10px] font-bold text-[#0F172A]">
          {caption}
        </div>
      )}
    </div>
  )
}
