import { useEffect, useRef, useState } from 'react'
import { addEffect } from '@react-three/fiber'
import { storeVariable, useStore } from '../useStore/useStore'

import '../Styles/hud.scss'

const getScore = () => `${storeVariable.gameScore.toFixed(0)}`
const getSpeed = () => `${(storeVariable.gameSpeed * 125).toFixed(0)}`

export default function Hud() {
    const gameOver = useStore(state => state.gameOver)
    const gameStart = useStore(state => state.gameStart)


    // const increaseSpeed = useStore(state => state.increaseSpeed)
    const [display, setDisplay] = useState(false)

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

    useEffect(() => {
        if (gameStart || gameOver) {
            setDisplay(true)
        } else if (!gameStart) {
            setDisplay(false)
        }
    }, [gameOver, gameStart,])

    return display ? (
        <div className='display'>
            <div className='hud__left'>
                <div className='hud__left-text'>SCORE</div>
                <div ref={scoreRef} className='hud__left-score'>{currentScore}</div>
            </div>
            <div className='hud__right'>
                <div className='hud__right-text'>SPEED</div>
                <div ref={speedRef} className='hud__right-speed'>{currentSpeed}</div>
            </div>
        </div>
    ) : null
}