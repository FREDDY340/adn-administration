import React from 'react';

interface AdnLogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const AdnLogo: React.FC<AdnLogoProps> = ({
  variant = 'dark',
  size = 'md',
  className = ''
}) => {
  const isLight = variant === 'light';

  const textSizes = {
    sm: {
      adn: 'text-xl tracking-tight',
      conseil: 'text-[9px] tracking-[0.2em]',
      tagline: 'text-[8px] tracking-wide'
    },
    md: {
      adn: 'text-2xl sm:text-3xl tracking-tight',
      conseil: 'text-[11px] sm:text-xs tracking-[0.22em]',
      tagline: 'text-[9px] sm:text-[10px] tracking-wide'
    },
    lg: {
      adn: 'text-3xl sm:text-4xl tracking-tight',
      conseil: 'text-xs sm:text-sm tracking-[0.25em]',
      tagline: 'text-[10px] sm:text-xs tracking-wide'
    }
  };

  const currentSize = textSizes[size];

  return (
    <div className={`flex flex-col select-none leading-none ${className}`}>
      <div className="flex items-baseline gap-1">
        <span
          className={`font-black ${currentSize.adn} ${
            isLight ? 'text-white' : 'text-[#0c2340]'
          } font-['Plus_Jakarta_Sans',sans-serif]`}
        >
          ADN
        </span>
      </div>
      <span
        className={`font-extrabold uppercase ${currentSize.conseil} ${
          isLight ? 'text-blue-300' : 'text-[#0c2340]'
        } -mt-0.5 font-['Plus_Jakarta_Sans',sans-serif]`}
      >
        CONSEILS
      </span>
      <span
        className={`font-medium ${currentSize.tagline} ${
          isLight ? 'text-slate-400' : 'text-slate-500'
        } mt-0.5`}
      >
        Services d'administration
      </span>
    </div>
  );
};
