'use client';

import { useState } from 'react';
import InteractiveParticles from './InteractiveParticles';
import BubbleParticles from './BubbleParticles';
import PolygonParticles from './PolygonParticles';
import ConfettiParticles from './ConfettiParticles';

type ParticleType = 'stars' | 'bubbles' | 'polygon' | 'confetti';

export default function ParticlesController() {
  const [particleType, setParticleType] = useState<ParticleType>('stars');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="absolute top-6 right-6 z-10">
        <div className="flex items-center gap-2">
          <div 
            className={`relative bg-black bg-opacity-40 backdrop-blur-md rounded-xl border border-white/20 shadow-lg overflow-hidden transition-all duration-300 ${isOpen ? 'w-40' : 'w-12'}`}
          >
            {isOpen ? (
              <div className="p-3">
                <div className="text-white text-xs font-semibold mb-2 opacity-70">Animation Style</div>
                {[
                  { id: 'stars', label: 'Stars' },
                  { id: 'bubbles', label: 'Bubbles' },
                  { id: 'polygon', label: 'Polygons' },
                  { id: 'confetti', label: 'Confetti' }
                ].map(option => (
                  <button
                    key={option.id}
                    className={`block w-full text-left px-2 py-1.5 rounded-md text-sm transition-colors ${particleType === option.id ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
                    onClick={() => {
                      setParticleType(option.id as ParticleType);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            ) : null}

            <button 
              className={`${isOpen ? 'absolute top-3 right-3' : 'flex items-center justify-center w-full h-12'}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close animation options" : "Open animation options"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {particleType === 'stars' && <InteractiveParticles />}
      {particleType === 'bubbles' && <BubbleParticles />}
      {particleType === 'polygon' && <PolygonParticles />}
      {particleType === 'confetti' && <ConfettiParticles />}
    </>

      {particleType === 'stars' && <InteractiveParticles />}
      {particleType === 'bubbles' && <BubbleParticles />}
      {particleType === 'polygon' && <PolygonParticles />}
      {particleType === 'confetti' && <ConfettiParticles />}
    </>
  );
}
