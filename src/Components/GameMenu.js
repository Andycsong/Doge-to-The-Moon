import { useState, useEffect } from 'react'
import { useStore } from '../useStore/useStore'
import dogeBackground from '../Assets/Texture/dogeBackground.png'
import '../Styles/gameMenu.scss'
import wasdControls from '../Assets/Texture/wasdKeys.png'
import arrowControls from '../Assets/Texture/arrowKeys.png'

const GameMenu = () => {

    const gameOver = useStore(state => state.gameOver)
    const gameStart = useStore(state => state.gameStart)
    const isGameStart = useStore(state => state.isGameStart)

    const [display, setDisplay] = useState(false)
    const [controlInfo, setControlInfo] = useState(false)

    useEffect(() => {
        if (gameStart || gameOver) {
            setDisplay(false)
        } else if (!gameStart) {
            setDisplay(true)
        }
    }, [gameOver, gameStart,])

    const handleGameStart = () => {
        isGameStart(true)
    }

    const handleControlInfo = () => {
        if (!controlInfo) {
            setControlInfo(true)
        } else if (controlInfo) {
            setControlInfo(false)
        }
    }

    return display ? (
        <div className="menu">
            <div className='menu__layer'>
                <div className="menu__container">
                    <img className="menu__logo" src={dogeBackground} alt="Logo"></img>
                </div>
                <div className="menu__content">
                    <button className="menu__start" onClick={handleGameStart}>START GAME</button>
                    <div className="menu__controls">
                        <button className="menu__controls-description" onClick={handleControlInfo}> VIEW CONTROLS TOGGLE</button>
                        <div className="menu__controls-container">
                            {controlInfo ? <img className="menu__controls-wasd" src={wasdControls} alt="wasd controls" /> :
                                <img className="menu__controls-arrow" src={arrowControls} alt="arrow keys controls" />
                            }
                            {controlInfo ? <pre className='menu__controls-wasd-layout'> W / S   FOR   &#8593;  / &#8595; <br /> A / D   FOR   &#8592; / &#8594; </pre> :
                                <pre className='menu__controls-arrow-layout'> USE ARROW KEYS</pre>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer">
                <div className="footer__content">
                    <h3> Created by Andy Song </h3>
                </div>
            </div>
        </div>
    ) : null

}

export default GameMenu