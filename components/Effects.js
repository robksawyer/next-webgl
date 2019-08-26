/**
 * components/Effects.js
 * This component creates a glitch effect
 */
import React, { useRef, useEffect } from 'react'
// import PropTypes from 'prop-types'
// A THREE.js React renderer, see: https://github.com/drcmda/react-three-fiber
import { useThree, useRender } from 'react-three-fiber'
import { animated } from 'react-spring'

// props
// Effects.propTypes = {
// }

// default props
// Effects.defaultProps = {
// }

const Effects = React.memo(({ factor }) => {
  const { gl, scene, camera, size } = useThree()
  const composer = useRef()
  useEffect(() => void composer.current.setSize(size.width, size.height), [size])
  // This takes over as the main render-loop (when 2nd arg is set to true)
  useRender(() => composer.current.render(), true)
  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" args={[scene, camera]} />
      <animated.glitchPass attachArray="passes" renderToScreen factor={factor} />
    </effectComposer>
  )
})

export default Effects
