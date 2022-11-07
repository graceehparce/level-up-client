import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createGame, getGameTypes } from '../../managers/GameManager.js'


export const GameForm = () => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])

    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })

    useEffect(
        () => {
            getGameTypes().then(gameTypes => setGameTypes(gameTypes))
        },
        []
    )

    const changeGameState = (domEvent) => {
        const newGame = Object.assign({}, currentGame)
        newGame[domEvent.target.name] = domEvent.target.value
        setCurrentGame(newGame)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="players">Number of Players: </label>
                    <input type="integer" name="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="type">Game Type?</label>
                    <select
                        class="form_select"
                        name="gameTypeId"
                        onChange={changeGameState}>
                        <option value="0">Choose Type</option>
                        {
                            gameTypes.map(
                                (gameType) => {
                                    return <option className="form-option" value={`${gameType.id}`}>{gameType.label}</option>
                                }
                            )
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset className="formSection">
                <label htmlFor="type">Skill Level?
                </label>
                <select
                    name="skillLevel"
                    class="form_select"
                    onChange={changeGameState}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        number_of_players: parseInt(currentGame.numberOfPlayers),
                        skill_level: parseInt(currentGame.skillLevel),
                        game_type: parseInt(currentGame.gameTypeId)
                    }

                    createGame(game)
                        .then(() => navigate("/"))
                }}
                className="btn btn-primary">Create</button>
        </form >
    )
}