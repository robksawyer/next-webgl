/**
 * components/Image.js
 * This component loads an image and projects it onto a plane
 */
import * as THREE from 'three'
import PropTypes from 'prop-types'
import React, { useState, useCallback, useMemo } from 'react'

import { useSpring, animated } from 'react-spring'

const Image = ({ url, opacity, scale, ...props }) => {
  const texture = useMemo(() => new THREE.TextureLoader().load(url), [url])
  const [hovered, setHover] = useState(false)
  const hover = useCallback(() => setHover(true), [])
  const unhover = useCallback(() => setHover(false), [])
  const { factor } = useSpring({ factor: hovered ? 1.1 : 1 })
  return (
    <animated.mesh {...props} onHover={hover} onUnhover={unhover} scale={factor.interpolate(f => [scale * f, scale * f, 1])}>
      <planeBufferGeometry attach="geometry" args={[5, 5]} />
      <animated.meshLambertMaterial attach="material" transparent opacity={opacity}>
        <primitive attach="map" object={texture} />
      </animated.meshLambertMaterial>
    </animated.mesh>
  )
}

// props
Image.propTypes = {
  url: PropTypes.string,
  opacity: PropTypes.number,
  scale: PropTypes.number,
}

// default props
Image.defaultProps = {
  url: '',
  opacity: 1,
  scale: 1,
}

export default Image
