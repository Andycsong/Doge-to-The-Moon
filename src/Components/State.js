import { useEffect } from 'react'
import { useFrame } from '@react-three/fiber'


import { useStore, storeVariable } from '../useStore/useStore'

const PLANE_SIZE = 1000
const LEVEL_SIZE = 6
const STARTING_GAME_SPEED = 0.8

export default function State() {
    const dogeShip = useStore(state => state.dogeShip)
    const gameStart = useStore(state => state.gameStart)
    const isScore = useStore(state => state.isScore)
    const increaseSpeed = useStore(state => state.increaseSpeed)
    const isGameOver = useStore(state => state.isGameOver)
    const difficulty = useStore(state => state.difficulty)

    useEffect(() => {
        storeVariable.currentDifficulty = -(difficulty * PLANE_SIZE * LEVEL_SIZE)
    }, [difficulty])

    useEffect(() => {
        if (gameStart) {
            storeVariable.setSpeed = STARTING_GAME_SPEED
        }
    }, [gameStart])

    useFrame((state, delta) => {

        //acceleration
        const deltaV = 1 * delta * 0.15
        if (gameStart && !storeVariable.gameOver) {
            if (storeVariable.gameSpeed < storeVariable.setSpeed) {
                increaseSpeed(true)
                if (storeVariable.gameSpeed + deltaV > storeVariable.setSpeed) {
                    storeVariable.gameSpeed = storeVariable.setSpeed
                } else {
                    storeVariable.gameSpeed += deltaV
                }
            } else {
                increaseSpeed(false)
            }
        }


        if (dogeShip.current) {
            storeVariable.gameScore = Math.abs(dogeShip.current.position.z) - 10
            storeVariable.shouldShiftItems = dogeShip.current.position.z < -400
                && dogeShip.current.position.z < storeVariable.currentDifficulty - 400
                && dogeShip.current.position.z > storeVariable.currentDifficulty - 1000
        }

        if (gameStart && storeVariable.gameOver) {
            isScore(Math.abs(dogeShip.current.position.z) - 10)
            isGameOver(true)
        }
    })

    return null
}