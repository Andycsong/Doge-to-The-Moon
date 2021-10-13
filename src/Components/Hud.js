import { useEffect, useState, useRef } from 'react'
import { addEffect } from '@react-three/fiber'
import { useStore, storeVariable } from '../useStore/useStore'

import '../Styles/hud.scss'

const getScore = () => `${storeVariable.gameScore.toFixed(0)}`

export default function Hud() {
    // const gameOver = useStore(state => state.gameOver)
    // const gameStarted = useStore(state => state.gameStarted)

    // const [displayHud, setDisplayHud] = useState(false)

    let then = Date.now()

    const scoreRef = useRef()
    let currentScore = getScore()

    useEffect(() => addEffect(() => {
        const current = Date.now()

        if (current - then > 33.3333) {
            if (scoreRef.current) { scoreRef.current.innerText = getScore() }
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
                <h1 className='display__title-score'> SCORE</h1>
                <h1 ref={scoreRef} className='display__score'>{currentScore}</h1>
            </div>
        </div>
    )
}