import { Color, RepeatWrapping, MirroredRepeatWrapping, BackSide } from 'three'
import React, { useRef, Suspense, useLayoutEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { useStore, mutation, storeVariable } from '../useStore/useStore'

import galaxyTexture from '../Assets/Texture/starHex.jpg'

const PLANE_SIZE = 1000
const GAME_SPEED_MULTIPLIER = 0.2


const TEXTURE_SIZE = PLANE_SIZE * 0.05 // 0.075
const MOVE_DISTANCE = PLANE_SIZE * 2

const color = new Color(0x000000)

function Terrain() {
    const ground = useRef()
    const groundTwo = useRef()

    const plane = useRef()
    const planeTop = useRef()
    const planeBot = useRef()
    const planeLeft = useRef()
    const planeRight = useRef()

    const planeTwo = useRef()
    const planeTwoTop = useRef()
    const planeTwoBot = useRef()
    const planeTwoLeft = useRef()
    const planeTwoRight = useRef()


    const textures = useTexture([galaxyTexture])

    const dogeShip = useStore(s => s.dogeShip)
    const difficultyScale = useStore(s => s.difficultyScale)

    useLayoutEffect(() => {
        textures.forEach(texture => {
            texture.wrapS = texture.wrapT = MirroredRepeatWrapping
            texture.repeat.set(TEXTURE_SIZE, TEXTURE_SIZE)
            texture.anisotropy = 16
        })
    }, [textures])

    const moveCounter = useRef(1)
    const lastMove = useRef(0)

    useFrame((state, delta) => {

        if (dogeShip.current) {
            // Alternates moving the two ground planes when we've just passed over onto a new plane, with logic to make sure it only happens once per pass
            // Checks if weve moved 10 meters into the new plane (-10) (so the old plane is no longer visible)
            if (Math.round(dogeShip.current.position.z) + PLANE_SIZE * moveCounter.current + 10 < -10) {

                // Ensures we only move the plane once per pass
                if (moveCounter.current === 1 || Math.abs(dogeShip.current.position.z) - Math.abs(lastMove.current) <= 10) {
                    // change the level every 4 moves or 4000 meters
                    if (moveCounter.current % 6 === 0) {
                        difficultyScale()
                        storeVariable.nextLevel++
                        storeVariable.setSpeed += GAME_SPEED_MULTIPLIER
                    }

                    if (moveCounter.current % 2 === 0) {
                        planeTwoBot.current.position.z -= MOVE_DISTANCE
                        lastMove.current = planeTwoBot.current.position.z

                        planeTwoTop.current.position.z -= MOVE_DISTANCE
                        lastMove.current = planeTwoTop.current.position.z

                        planeTwoLeft.current.position.z -= MOVE_DISTANCE
                        lastMove.current = planeTwoLeft.current.position.z

                        planeTwoRight.current.position.z -= MOVE_DISTANCE
                        lastMove.current = planeTwoRight.current.position.z

                    } else {
                        planeBot.current.position.z -= MOVE_DISTANCE
                        lastMove.current = planeBot.current.position.z

                        planeTop.current.position.z -= MOVE_DISTANCE
                        lastMove.current = planeTop.current.position.z

                        planeLeft.current.position.z -= MOVE_DISTANCE
                        lastMove.current = planeLeft.current.position.z

                        planeRight.current.position.z -= MOVE_DISTANCE
                        lastMove.current = planeRight.current.position.z

                    }
                }

                moveCounter.current++
            }
        }
    })
    return (
        <>
            <group ref={ground}  >
                <mesh // bottom wall
                    ref={planeBot}
                    receiveShadow
                    visible
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, 0, -(PLANE_SIZE / 2)]}
                >
                    <planeBufferGeometry attach="geometry" args={[600, PLANE_SIZE, 300, 8, 8]} />
                    <meshStandardMaterial
                        receiveShadow
                        attach="material"
                        roughness={1}
                        metalness={-1}
                        side={BackSide}
                        color="blue"
                        wireframe
                    />
                </mesh>

                <mesh // Top wall
                    ref={planeTop}
                    receiveShadow
                    visible
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, 300, -(PLANE_SIZE / 2)]}
                >
                    <planeBufferGeometry attach="geometry" args={[600, PLANE_SIZE, 300, 8, 8]} />
                    <meshStandardMaterial
                        receiveShadow
                        attach="material"
                        roughness={1}
                        metalness={-1}
                        side={BackSide}
                        color="blue"
                        wireframe
                    />
                </mesh>

                <mesh // Left wall
                    ref={planeLeft}
                    receiveShadow
                    visible
                    rotation={[0, -Math.PI / 2, 0]}
                    position={[-300, 150, -(PLANE_SIZE / 2)]}
                >
                    <planeBufferGeometry attach="geometry" args={[PLANE_SIZE, 300, 300, 8, 8]} />
                    <meshStandardMaterial
                        receiveShadow
                        attach="material"
                        roughness={1}
                        metalness={-1}
                        side={BackSide}
                        color="blue"
                        wireframe
                    />
                </mesh>
                <mesh // Right wall
                    ref={planeRight}
                    receiveShadow
                    visible
                    rotation={[0, -Math.PI / 2, 0]}
                    position={[300, 150, -(PLANE_SIZE / 2)]}
                >
                    <planeBufferGeometry attach="geometry" args={[PLANE_SIZE, 300, 300, 8, 8]} />
                    <meshStandardMaterial
                        receiveShadow
                        attach="material"
                        roughness={1}
                        metalness={-1}
                        side={BackSide}
                        color="blue"
                        wireframe
                    />

                </mesh>
            </group>

            <group ref={groundTwo} >
                <mesh // Bottom wall
                    ref={planeTwoBot}
                    receiveShadow
                    visible
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, 0, -PLANE_SIZE - (PLANE_SIZE / 2)]}
                >
                    <planeBufferGeometry attach="geometry" args={[600, PLANE_SIZE, 300, 8, 8]} />
                    <meshStandardMaterial
                        receiveShadow
                        // emissiveMap={textures[1]}
                        // map={textures[0]}
                        attach="material"
                        roughness={1}
                        metalness={-1}
                        side={BackSide}
                        color="blue"
                        wireframe
                    />
                </mesh>
                <mesh //Top wall 
                    ref={planeTwoTop}
                    receiveShadow
                    visible
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, 300, -PLANE_SIZE - (PLANE_SIZE / 2)]}
                >
                    <planeBufferGeometry attach="geometry" args={[600, PLANE_SIZE, 300, 8, 8]} />
                    <meshStandardMaterial
                        receiveShadow
                        // emissiveMap={textures[1]}
                        // map={textures[0]}
                        attach="material"
                        roughness={1}
                        metalness={-1}
                        side={BackSide}
                        color="blue"
                        wireframe
                    />
                </mesh>
                <mesh // left wall
                    ref={planeTwoLeft}
                    receiveShadow
                    visible
                    rotation={[0, -Math.PI / 2, 0]}
                    position={[-300, 150, -PLANE_SIZE - (PLANE_SIZE / 2)]}
                >
                    <planeBufferGeometry attach="geometry" args={[PLANE_SIZE, 300, 300, 8, 8]} />
                    <meshStandardMaterial
                        receiveShadow
                        // emissiveMap={textures[1]}
                        // map={textures[0]}
                        attach="material"
                        roughness={1}
                        metalness={-1}
                        side={BackSide}
                        color="blue"
                        wireframe
                    />
                </mesh>
                <mesh // right wall
                    ref={planeTwoRight}
                    receiveShadow
                    visible
                    rotation={[0, -Math.PI / 2, 0]}
                    position={[300, 150, -PLANE_SIZE - (PLANE_SIZE / 2)]}
                >
                    <planeBufferGeometry attach="geometry" args={[PLANE_SIZE, 300, 300, 8, 8]} />
                    <meshStandardMaterial
                        receiveShadow
                        // emissiveMap={textures[1]}
                        // map={textures[0]}
                        attach="material"
                        roughness={1}
                        metalness={-1}
                        side={BackSide}
                        color="blue"
                        wireframe
                    />
                </mesh>
            </group>
        </>
    )
}

function LoadingGround() {
    return (
        <mesh
            receiveShadow
            visible
            position={[0, 0, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
        >
            <planeBufferGeometry attach="geometry" args={[5000, 5000, 1, 1]} />
            <meshStandardMaterial
                receiveShadow
                attach="material"
                color={`black`}
                roughness={1}
                metalness={0}
            />
        </mesh>
    )
}

export default function TerrainGround() {

    return (
        <Suspense fallback={<LoadingGround />}>
            <Terrain />
        </Suspense>
    )
}