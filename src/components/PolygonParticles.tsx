'use client';

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Container, Engine } from "tsparticles-engine";

export default function PolygonParticles() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log("Particles container loaded", container);
  }, []);

  return (
    <Particles
      id="tsparticles-polygon"
      className="absolute inset-0 z-0"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: false,
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "slow",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            slow: {
              factor: 3,
              radius: 200,
            },
          },
        },
        particles: {
          color: {
            value: ["#800080", "#4B0082", "#8A2BE2", "#9932CC", "#9370DB"],
          },
          links: {
            color: {
              value: "#c8c8c8"
            },
            distance: 150,
            enable: true,
            opacity: 0.4,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 50,
          },
          opacity: {
            value: 0.7,
          },
          shape: {
            type: "polygon",
            polygon: {
              sides: 6
            }
          },
          size: {
            value: { min: 2, max: 6 },
          },
          rotate: {
            value: {
              min: 0,
              max: 360
            },
            direction: "clockwise",
            animation: {
              enable: true,
              speed: 5,
              sync: false
            }
          },
        },
        detectRetina: true,
      }}
    />
  );
}
