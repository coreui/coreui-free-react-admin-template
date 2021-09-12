import React from 'react'
import Particles from 'react-particles-js'
import { randomInRange } from 'tsparticles/Utils'

const AppBackground = () => {
  return (
    <>
      <Particles
        params={{
          particles: {
            number: {
              value: randomInRange({ min: 30, max: 75 }),
              density: {
                enable: true,
                value_area: 2000,
              },
            },
            color: {
              value: [
                '#00ffcf',
                '#2cffd9',
                '#81f7ee',
                '#00dee6',
                '#00d3ec',
                '#06caf1',
                '#22bff7',
                '#32b1fd',
                '#a2d6fe',
              ],
            },
            opacity: {
              value: 0.8,
              random: true,
              anim: {
                enable: true,
                speed: 0.8,
                opacity_min: 0.1,
              },
            },
            size: {
              value: 30,
              random: {
                enable: true,
                minimumValue: 5,
              },
              anim: {
                speed: 2,
                size_min: 0.3,
                minimumValue: 30,
              },
            },
            move: {
              random: true,
              speed: 0.5,
              out_mode: 'bounce',
            },
            line_linked: {
              width: 2.5,
              color: {
                value: [
                  '#00ffcf',
                  '#2cffd9',
                  '#81f7ee',
                  '#00dee6',
                  '#00d3ec',
                  '#06caf1',
                  '#22bff7',
                  '#32b1fd',
                  '#a2d6fe',
                ],
              },
            },
          },
          interactivity: {
            detect_on: 'window',
            events: {
              onClick: {
                enable: true,
                mode: ['attract', 'slow'],
              },
            },
          },
        }}
      />
    </>
  )
}

export default React.memo(AppBackground)
