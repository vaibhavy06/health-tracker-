import React from 'react';

export const CozyGirlIllustration: React.FC<{ className?: string }> = ({ className = 'w-48 h-48' }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF0F5" />
        <stop offset="100%" stopColor="#FFE4EC" />
      </linearGradient>
      <linearGradient id="blanketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FCAEC2" />
        <stop offset="100%" stopColor="#F472B6" />
      </linearGradient>
      <linearGradient id="mugGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#FFF1F5" />
      </linearGradient>
    </defs>

    {/* Background Soft Glow Cloud */}
    <circle cx="100" cy="100" r="82" fill="url(#cloudGrad)" opacity="0.6" />
    <path d="M40 145C30 145 22 135 25 125C20 115 25 100 38 98C42 80 65 72 80 82C90 68 118 68 128 82C145 74 165 85 168 102C178 106 182 120 175 130C178 140 170 148 160 148H40Z" fill="#FFF5F8" opacity="0.8" />

    {/* Sparkles & Tiny Hearts */}
    <path d="M45 55L47 48L54 46L47 44L45 37L43 44L36 46L43 48L45 55Z" fill="#F472B6" opacity="0.75" />
    <path d="M160 48L161.5 42L167.5 40.5L161.5 39L160 33L158.5 39L152.5 40.5L158.5 42L160 48Z" fill="#F472B6" opacity="0.75" />
    <path d="M165 140C165 137 167 135 170 135C173 135 175 137 175 140C175 144 170 148 170 148C170 148 165 144 165 140Z" fill="#EE4F7C" opacity="0.6" />

    {/* Girl Resting in Cozy Armchair / Cushions */}
    <circle cx="100" cy="90" r="42" fill="#FFE2E8" />
    
    {/* Soft Hair */}
    <path d="M75 92C72 75 80 62 100 62C120 62 128 75 125 92C128 98 126 112 118 116C112 105 110 98 100 98C90 98 88 105 82 116C74 112 72 98 75 92Z" fill="#6B4B58" />
    
    {/* Cute Face */}
    <ellipse cx="100" cy="94" rx="16" ry="17" fill="#FED8DF" />
    {/* Cute Closed peaceful eyes */}
    <path d="M91 93C93 96 96 96 97 93" stroke="#6B4B58" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M103 93C104 96 107 96 109 93" stroke="#6B4B58" strokeWidth="1.8" strokeLinecap="round" />
    {/* Soft blush on cheeks */}
    <circle cx="89" cy="98" r="3.2" fill="#F472B6" opacity="0.65" />
    <circle cx="111" cy="98" r="3.2" fill="#F472B6" opacity="0.65" />
    {/* Gentle smile */}
    <path d="M97 101C98.5 103 101.5 103 103 101" stroke="#BA3863" strokeWidth="1.4" strokeLinecap="round" />

    {/* Cute hair bow */}
    <path d="M84 72C80 68 76 72 82 76C86 78 88 75 88 75C88 75 86 72 84 72Z" fill="#F43F5E" />
    <path d="M94 72C98 68 102 72 96 76C92 78 90 75 90 75C90 75 92 72 94 72Z" fill="#F43F5E" />
    <circle cx="89" cy="74" r="2.2" fill="#FFE4E6" />

    {/* Cozy Blanket */}
    <path d="M55 126C55 112 72 108 100 108C128 108 145 112 145 126C145 148 132 165 100 165C68 165 55 148 55 126Z" fill="url(#blanketGrad)" />
    
    {/* Cozy Blanket Folds & Texture */}
    <path d="M68 132C80 138 120 138 132 132" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" />
    <path d="M78 144C90 148 110 148 122 144" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.4" />

    {/* Steaming Ceramic Tea Mug */}
    <g transform="translate(90, 116)">
      <rect x="0" y="2" width="20" height="22" rx="4" fill="url(#mugGrad)" stroke="#F9A8D4" strokeWidth="1" />
      <path d="M20 7C24 7 24 15 20 15" stroke="#F9A8D4" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M8 8C8 7 12 7 12 8C12 9 8 9 8 8Z" fill="#EE4F7C" />
      {/* Steam */}
      <path d="M7 -2C6 -5 8 -7 7 -10" stroke="#F472B6" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      <path d="M13 -1C14 -4 12 -6 13 -9" stroke="#F472B6" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    </g>

    {/* Flowers at base */}
    <g transform="translate(42, 142)">
      <circle cx="10" cy="10" r="4" fill="#FDE047" />
      <circle cx="10" cy="4" r="3.5" fill="#FDA4AF" />
      <circle cx="16" cy="10" r="3.5" fill="#FDA4AF" />
      <circle cx="10" cy="16" r="3.5" fill="#FDA4AF" />
      <circle cx="4" cy="10" r="3.5" fill="#FDA4AF" />
    </g>
    <g transform="translate(138, 140)">
      <circle cx="8" cy="8" r="3" fill="#FDE047" />
      <circle cx="8" cy="3" r="2.8" fill="#E9D5FF" />
      <circle cx="13" cy="8" r="2.8" fill="#E9D5FF" />
      <circle cx="8" cy="13" r="2.8" fill="#E9D5FF" />
      <circle cx="3" cy="8" r="2.8" fill="#E9D5FF" />
    </g>
  </svg>
);

export const SkincareIllustration: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="44" fill="#FFF0F5" />
    {/* Bottle 1: Toner / Mist */}
    <rect x="22" y="38" width="18" height="36" rx="5" fill="#FED7E2" stroke="#F687B3" strokeWidth="1.2" />
    <rect x="27" y="28" width="8" height="10" rx="2" fill="#FFFFFF" stroke="#F687B3" strokeWidth="1" />
    <path d="M31 28V24" stroke="#F687B3" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="31" cy="54" r="3" fill="#F472B6" />

    {/* Jar: Cream */}
    <rect x="46" y="46" width="32" height="28" rx="6" fill="#FFFFFF" stroke="#E9D5FF" strokeWidth="1.2" />
    <rect x="43" y="40" width="38" height="9" rx="3" fill="#D8B4FE" />
    <path d="M56 58C60 56 64 62 68 58" stroke="#D8B4FE" strokeWidth="1.2" strokeLinecap="round" />
    {/* Sparkle */}
    <path d="M78 26L79 21L84 20L79 19L78 14L77 19L72 20L77 21L78 26Z" fill="#F472B6" />
  </svg>
);

export const CuteTeacupIllustration: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="44" fill="#FFF7ED" />
    {/* Saucer */}
    <ellipse cx="50" cy="74" rx="30" ry="7" fill="#FDE68A" opacity="0.6" />
    <ellipse cx="50" cy="72" rx="28" ry="6" fill="#FFFFFF" stroke="#FBBF24" strokeWidth="1" />
    {/* Cup */}
    <path d="M28 42C28 62 38 68 50 68C62 68 72 62 72 42H28Z" fill="#FFFFFF" stroke="#F472B6" strokeWidth="1.5" />
    {/* Handle */}
    <path d="M72 48C79 48 81 58 72 61" stroke="#F472B6" strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* Tea tea surface */}
    <ellipse cx="50" cy="42" rx="20" ry="4" fill="#D97706" opacity="0.4" />
    {/* Heart on cup */}
    <path d="M50 56C50 54 48 52 46 52C44 52 43 53.5 43 55C43 58 48 60 50 62C52 60 57 58 57 55C57 53.5 56 52 54 52C52 52 50 54 50 56Z" fill="#EE4F7C" />
    {/* Steam */}
    <path d="M44 32C42 27 46 24 44 20" stroke="#F472B6" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    <path d="M56 32C58 27 54 24 56 20" stroke="#F472B6" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
  </svg>
);

export const WaterDropIllustration: React.FC<{ filled?: boolean; className?: string }> = ({ filled = true, className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"
      fill={filled ? '#38BDF8' : '#F0F9FF'}
      stroke={filled ? '#0284C7' : '#BAE6FD'}
      strokeWidth="1.5"
    />
    {filled && (
      <path
        d="M10 9C9 11 9 13 11 15"
        stroke="#FFFFFF"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.8"
      />
    )}
  </svg>
);

export const CuteBowIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5 text-pink-500' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 10.5C11.17 10.5 10.5 11.17 10.5 12C10.5 12.83 11.17 13.5 12 13.5C12.83 13.5 13.5 12.83 13.5 12C13.5 11.17 12.83 10.5 12 10.5Z" />
    <path d="M10.5 12C7.5 9 3 9.5 3 12C3 14.5 7.5 15 10.5 12Z" opacity="0.9" />
    <path d="M13.5 12C16.5 9 21 9.5 21 12C21 14.5 16.5 15 13.5 12Z" opacity="0.9" />
    <path d="M10.8 13.2L8 19C8 19 9.5 18 11.5 18L11.5 13.5" opacity="0.8" />
    <path d="M13.2 13.2L16 19C16 19 14.5 18 12.5 18L12.5 13.5" opacity="0.8" />
  </svg>
);
