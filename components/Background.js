/**
 * components/Background.js
 * This component creates a fullscreen colored plane
 */
import React from 'react'
import * as THREE from 'three'
import PropTypes from 'prop-types'
// A THREE.js React renderer, see: https://github.com/drcmda/react-three-fiber
import { useThree } from 'react-three-fiber'

// A React animation lib, see: https://github.com/react-spring/react-spring
import { animated } from 'react-spring-three'

const Background = ({ color }) => {
  const { viewport } = useThree()
  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry attach="geometry" args={[1, 1]} />
      <animated.meshBasicMaterial attach="material" color={color} depthTest={false} />
    </mesh>
  )
}

// props
Background.propTypes = {
  color: PropTypes.string,
}

// default
Background.defaultProps = {
  color: '#ff0000',
}

export default Background
