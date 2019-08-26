import React from 'react'

import * as THREE from 'three'

// import { Button, Form, InputGroup, Label } from 'reactstrap'

// A THREE.js React renderer, see: https://github.com/drcmda/react-three-fiber
import { apply as applyThree, Canvas, useRender, useThree } from 'react-three-fiber'
// A React animation lib, see: https://github.com/react-spring/react-spring
import { apply as applySpring, useSpring, a, interpolate } from 'react-spring'

import Renderer from './Renderer'

// Import and register postprocessing classes as three-native-elements for both react-three-fiber & react-spring
// They'll be available as native elements <effectComposer /> from then on ...
import { EffectComposer } from '../postprocessing/EffectComposer'
import { RenderPass } from '../postprocessing/RenderPass'
import { GlitchPass } from '../postprocessing/GlitchPass'
applySpring({ EffectComposer, RenderPass, GlitchPass })
applyThree({ EffectComposer, RenderPass, GlitchPass })

/**
 * Implements a 3D scene
 *
 * Functions of this class are to be passed as callbacks to Renderer.
 *
 * Parameters passed to every function are:
 *
 *   - renderer:  Three.js WebGLRenderer object
 *     (https://threejs.org/docs/#api/renderers/WebGLRenderer)
 *
 *   - gl:  WebGLRenderingContext of the underlying canvas element
 *     (https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext)
 */
class Scene extends React.Component {
  constructor(props, context) {
    super(props, context)

    // Some local state for this component
    this.state = {
      rotationDirection: +1, // shows which direction cube spins
    }
  }

  onResize = (renderer, gl, { width, height }) => {
    // This function is called after canvas has been resized.

    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
  }

  initScene = (renderer, gl) => {
    // This function is called once, after canvas component has been mounted.
    // And WebGLRenderer and WebGLRenderingContext have been created.

    this.material = new THREE.MeshPhongMaterial({
      color: '#ffd9fd',
      specular: '#ff44ff',
    })

    this.scene = new THREE.Scene()

    this.cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), this.material)
    this.cube.position.x = 0
    this.cube.position.y = 0
    this.cube.position.z = 0
    this.scene.add(this.cube)

    const ambientLight = new THREE.AmbientLight('#ff44ff', 1.5)
    this.scene.add(ambientLight)

    const pointLight = new THREE.PointLight('#ffffff', 1.0)
    pointLight.position.set(5, 10, 5)
    this.scene.add(pointLight)

    this.camera = new THREE.PerspectiveCamera(75, 16 / 9, 0.1, 1000)
    this.camera.position.z = 4

    renderer.setClearColor('#ccd9fd')
  }

  renderScene = (renderer, gl) => {
    // This function is called when browser is ready to repaint the canvas.
    // Draw your single frame here.

    this.cube.rotation.y += Math.random()/6 * this.state.rotationDirection
    this.cube.rotation.x += Math.random()/6 * this.state.rotationDirection

    renderer.render(this.scene, this.camera)
  }

  handleDirectionButtonClick = () => {
    // Flip rotation direction sign
    this.setState({
      rotationDirection: this.state.rotationDirection * -1,
    })
  }

  render = () => {
    return (
      <div className='container-fluid'>


        {/* Column with Renderer */}
        <div className='w-100'>
          <Renderer
            onResize={this.onResize}
            initScene={this.initScene}
            renderScene={this.renderScene}
          />
        </div>

        {/*language=CSS*/}
        <style jsx>{`
          .container-fluid {
            width: 100vw;
            height: 100vh;
          }

          .row {
            height: 100vh;
          }

        `}</style>
      </div>
    )
  }
}

export default Scene
