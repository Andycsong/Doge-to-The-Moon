import { useEffect, useRef } from 'react'
import { addEffect } from '@react-three/fiber'
import { storeVariable, useStore } from '../useStore/useStore'

import '../Styles/hud.scss'

const getScore = () => `${storeVariable.gameScore.toFixed(0)}`
const getSpeed = () => `${(storeVariable.gameSpeed * 125).toFixed(0)}`

export default function Hud() {
    // const gameOver = useStore(state => state.gameOver)
    // const gameStarted = useStore(state => state.gameStarted)

    // const [displayHud, setDisplayHud] = useState(false)

    // const increaseSpeed = useStore(state => state.increaseSpeed)

    let then = Date.now()

    const scoreRef = useRef()
    let currentScore = getScore()

    const speedRef = useRef()
    let currentSpeed = getSpeed()

    useEffect(() => addEffect(() => {
        const current = Date.now()

        if (current - then > 30) {
            if (scoreRef.current) { scoreRef.current.innerText = getScore() }
            if (speedRef.current) { speedRef.current.innerText = getSpeed() }
            // scoreRef.current ? scoreRef.current.innerText = getScore() : 0
            // speedRef.current ? speedRef.current.innerText = getSpeed() : 0

            then = current
        }

    }))

    // useEffect(() => {
    //     if (gameStarted && !gameOver) {
    //         setDisplayHud(true)
    //     } else if (gameOver && !gameStarted) {
    //         setDisplayHud(false)
    //     }
    // }, [gameStarted, gameOver])

    return (
        <div className='display'>
            <div className='display-right'>
                <div className='display__score-container'>
                    <h1 className='display__title-score'> SCORE</h1>
                    <h1 ref={scoreRef} className='display__score'>{currentScore}</h1>
                </div>
                <div className='display__speed-container'>
                    <h1 className='display__title-speed'> SPEED</h1>
                    <h1 ref={speedRef} className='display__speed'>{currentSpeed}</h1>
                </div>
            </div>
        </div>
    )
}