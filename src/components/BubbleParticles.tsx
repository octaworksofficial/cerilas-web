'use client';

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Container, Engine } from "tsparticles-engine";

export default function BubbleParticles() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log("Particles container loaded", container);
  }, []);

  return (
    <Particles
      id="tsparticles-bubbles"
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
              mode: "bubble",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            bubble: {
              distance: 200,
              size: 10,
              duration: 2,
              opacity: 0.8,
              speed: 3
            },
          },
        },
        particles: {
          color: {
            value: ["#6495ED", "#00BFFF", "#1E90FF", "#87CEEB", "#ADD8E6"],
          },
          links: {
            enable: false
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "out",
            },
            random: true,
            speed: 1.5,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 60,
          },
          opacity: {
            value: 0.6,
            random: true,
            animation: {
              enable: true,
              speed: 0.5,
              minimumValue: 0.1,
              sync: false
            }
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 3, max: 8 },
            random: true,
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 1,
              sync: false
            }
          },
          life: {
            duration: {
              sync: false,
              value: 10
            },
            count: 1
          },
        },
        detectRetina: true,
      }}
    />
  );
}
