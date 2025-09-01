'use client';

import { useState } from 'react';

import BubbleParticles from './BubbleParticles';
import ConfettiParticles from './ConfettiParticles';
import InteractiveParticles from './InteractiveParticles';
import PolygonParticles from './PolygonParticles';

type ParticleType = 'stars' | 'bubbles' | 'polygon' | 'confetti';

export default function ParticlesController() {
  const [particleType, setParticleType] = useState<ParticleType>('stars');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="absolute right-6 top-6 z-10">
        <div className="flex items-center gap-2">
          <div
            className={`relative overflow-hidden rounded-xl border border-white/20 bg-black bg-opacity-40 shadow-lg backdrop-blur-md transition-all duration-300 ${isOpen ? 'w-40' : 'w-12'}`}
          >
            {isOpen
              ? (
                  <div className="p-3">
                    <div className="mb-2 text-xs font-semibold text-white opacity-70">Animation Style</div>
                    {[
                      { id: 'stars', label: 'Stars' },
                      { id: 'bubbles', label: 'Bubbles' },
                      { id: 'polygon', label: 'Polygons' },
                      { id: 'confetti', label: 'Confetti' },
                    ].map(option => (
                      <button
                        key={option.id}
                        className={`block w-full rounded-md px-2 py-1.5 text-left text-sm transition-colors ${particleType === option.id ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
                        onClick={() => {
                          setParticleType(option.id as ParticleType);
                        }}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )
              : null}

            <button
              className={`${isOpen ? 'absolute right-3 top-3' : 'flex h-12 w-full items-center justify-center'}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close animation options' : 'Open animation options'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="size-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen
                  ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    )
                  : (
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
  );
}
