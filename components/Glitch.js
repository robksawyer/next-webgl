/**
 * components/Glitch.js
 * This component maintains the scene
 */
import React, { useRef, useEffect, useCallback } from 'react'
// A THREE.js React renderer, see: https://github.com/drcmda/react-three-fiber
import { apply as applyThree, useThree } from 'react-three-fiber'
// A React animation lib, see: https://github.com/react-spring/react-spring
import { apply as applySpring, useSpring, animated } from 'react-spring'

import Effects from './Effects'
import Background from './Background'
import Text from './Text'

// Import and register postprocessing classes as three-native-elements for both react-three-fiber & react-spring
// They'll be available as native elements <effectComposer /> from then on ...
import { EffectComposer } from '../postprocessing/EffectComposer'
import { RenderPass } from '../postprocessing/RenderPass'
import { GlitchPass } from '../postprocessing/GlitchPass'
applySpring({ EffectComposer, RenderPass, GlitchPass })
applyThree({ EffectComposer, RenderPass, GlitchPass })


const Glitch = () => {
  const { size } = useThree()
  const scrollMax = size.height * 4.5
  // This tiny spring right here controlls all(!) the animations, one for scroll, the other for mouse movement ...
  const [{ top, mouse }, set] = useSpring(() => ({ top: 0, mouse: [0, 0] }))
  const onMouseMove = useCallback(({ clientX: x, clientY: y }) => set({ mouse: [x - window.innerWidth / 2, y - window.innerHeight / 2] }), [])
  const onScroll = useCallback(e => set({ top: e.target.scrollTop }), [])

  return (
    <>
      <animated.spotLight
        intensity={1.2}
        color="white"
        position={mouse.interpolate((x, y) => [x / 100, -y / 100, 6.5])}
      />
      <Effects
        factor={top.interpolate([0, 150], [1, 0])}
      />
      <Background
        color={
          top.interpolate(
            [0, scrollMax * 0.25, scrollMax * 0.8, scrollMax],
            ['#27282F', '#247BA0', '#70C1B3', '#f8f3f1'],
          )} />
      <Text
        opacity={top.interpolate([0, 200], [1, 0])}
        position={top.interpolate(top => [0, -1 + top / 200, 0])}>
        lorem
      </Text>
      <Text
        position={top.interpolate(top => [0, -20 + ((top * 10) / scrollMax) * 2, 0])}
        color="black"
        fontSize={150}>
        Ipsum
      </Text>
    </>
  )
}

export default Glitch
