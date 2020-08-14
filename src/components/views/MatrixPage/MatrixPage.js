import React, { Suspense } from "react"
import { Canvas } from "react-three-fiber"
import { OrbitControls } from "drei"
import { BlendFunction, EffectComposer, SSAO, Bloom, Noise, Glitch, Pixelation } from "react-postprocessing"
import { Vector2 } from "three"
import './MatrixPage.css'

const boxPostions = [
  [-3, 8, 0],
  [-3, 4, 0], [1, 4, 0], [5, 4, 0], [9, 4, 0],
  [-3, 0, 0], [1, 0, 0], [5, 0, 0], [9, 0, 0],
  [-3, -4, 0], [1, -4, 0], [5, -4, 0], [9, -4, 0],
  [-3, -8, 0], [1, -8, 0], [5, -8, 0], [9, -8, 0],
]

const getBox = (position, index) => {
    return (
      <Suspense fallback={null} key={index}>
        <mesh position={position}>
          <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
          <meshStandardMaterial attach="material" color="white" />
        </mesh>
      </Suspense>
    );
}


function MatrixPage() {
  return (
    <div className="matrix-wrapper">
      <Canvas invalidateFrameloop shadowMap camera={{ position: [0, 0, 20], far: 50 }}>
        <spotLight
          intensity={2}
          position={[20, 20, 20]}
          shadow-bias={-0.00005}
          angle={Math.PI / 6}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          castShadow
        />
        <OrbitControls />
        {boxPostions.map((position, index) => {
          return getBox(position, index)
        })}
      </Canvas>
    </div>
  )
}


export default MatrixPage