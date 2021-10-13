import { createRef } from 'react'
import { Color } from 'three'
import create from 'zustand'

const useStore = create((set, get) => {
    return {
        set,
        get,
        gameScore: 0,
        difficulty: 0,
        gameOver: false,
        gameStart: false,
        speedIncreased: false,
        controlRef: { left: false, right: false, up: false, down: false, },
        directionalLight: createRef(),
        view: createRef(),
        dogeShip: createRef(),
        moon: createRef(),
        increaseSpeed: (speedIncrease) => set(state => ({ speedIncreased: speedIncrease })),
        difficultyScale: () => set(state => ({ difficulty: state.difficulty + 1 })),
        isScore: (gameScore) => set(state => ({ gameScore: gameScore })),
        isGameStart: (start) => set(state => ({ gameStart: start })),
        isGameOver: (over) => set(state => ({ gameOver: over })),
    }
})

const storeVariable = {
    gameOver: false,
    gameSpeed: 0.0,
    gameScore: 0,
    setSpeed: 0.0,
    horizontalV: 0,
    verticalV: 0,
    nextLevel: 0,
    shouldShiftItems: false,
    currentDifficulty: 0,
    globalColor: new Color()
}

export { useStore, storeVariable }
