import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Preload } from '@react-three/drei'
import { useStore } from './useStore/useStore'

import State from './Components/State'


import GameControls from './Components/GameControls'
import Skybox from './Components/SkyBox'
import Ship from './Components/Ship'
import MapBoundary from './Components/MapBoundary'
import Obstacles from './Components/Obstacles'
import Hud from './Components/Hud'
import GameMenu from './Components/GameMenu'
import GameOver from './Components/GameOver'
import Terrain from './Components/Terrain'


function App() {
  const directionalLight = useStore((s) => s.directionalLight)

  return (
    <>
      <Canvas mode="concurrent" dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <State />
          <Skybox />
          <directionalLight
            ref={directionalLight}
            intensity={5}
            position={[0, Math.PI, 0]}
          // color={'#e1b303'}
          />
          <ambientLight intensity={0} />
          <Ship />
          < MapBoundary />
          <Obstacles />
          <Terrain />
          <GameControls />
          <Preload all />
        </Suspense>
      </Canvas>
      <Hud />
      <GameMenu />
      <GameOver />
    </>
  );
}

export default App;
