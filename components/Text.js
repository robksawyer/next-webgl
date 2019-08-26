/**
 * compoenents/Text.js
 * This renders text via canvas and projects it as a sprite
 */
import React, { useMemo } from 'react'
import * as THREE from 'three'
import PropTypes from 'prop-types'

// A THREE.js React renderer, see: https://github.com/drcmda/react-three-fiber
import { useThree } from 'react-three-fiber'
import { animated } from 'react-spring'

const Text = ({ children, position, opacity, color = 'white', fontSize = 410 }) => {
  const {
    size: { width, height },
    viewport: { width: viewportWidth, height: viewportHeight }
  } = useThree()
  const scale = viewportWidth > viewportHeight ? viewportWidth : viewportHeight
  const canvas = useMemo(
    () => {
      const canvas = document.createElement('canvas')
      canvas.width = canvas.height = 2048
      const context = canvas.getContext('2d')
      context.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif`
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.fillStyle = color
      context.fillText(children, 1024, 1024 - 410 / 2)
      return canvas
    },
    [children, width, height],
  )
  return (
    <animated.sprite scale={[scale, scale, 1]} position={position}>
      <animated.spriteMaterial attach="material" transparent opacity={opacity}>
        <canvasTexture attach="map" image={canvas} premultiplyAlpha onUpdate={s => (s.needsUpdate = true)} />
      </animated.spriteMaterial>
    </animated.sprite>
  )
}

// props contain user callbacks
Text.propTypes = {
  fontSize: PropTypes.number,
  color: PropTypes.string,
  opacity: PropTypes.string,
  position: PropTypes.number,
}

// default callbacks are no-op
Text.defaultProps = {
  fontSize: 410,
  color: 'white',
  opacity: 1,
  position: 1,
}

export default Text
