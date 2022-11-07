import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { getGameTypes } from '../../managers/GameManager.js'
import { useParams } from "react-router-dom"


export const UpdateGameForm = () => {

    const navigate = useNavigate()
    const { gameId } = useParams()
    const [gameTypes, setGameTypes] = useState([])
    const [currentGame, setGame] = useState({})

    useEffect(
        () => {
            getGameTypes().then(gameTypes => setGameTypes(gameTypes))
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8000/games/${gameId}`, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("lu_token")}`
                }
            })
                .then(response => response.json())
                .then((gameObject) => {
                    setGame(gameObject)
                })
        },
        [gameId])




    const completeUpdate = (event) => {
        return fetch(`http://localhost:8000/games/${gameId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,

                "Content-Type": "application/json"
            },
            body: JSON.stringify(currentGame)
        })
            .then(() => {
                navigate(`/games`)
            })
    }

    const changeGameState = (domEvent) => {
        const newGame = Object.assign({}, currentGame)
        newGame[domEvent.target.name] = domEvent.target.value
        setGame(newGame)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Update Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input placeholder={currentGame.title} type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input placeholder={currentGame.maker} type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="players">Number of Players: </label>
                    <input placeholder={currentGame.number_of_players} type="integer" name="number_of_players" required autoFocus className="form-control"
                        value={currentGame.number_of_players}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="type">Game Type?</label>
                    <select
                        class="form_select"
                        name="game_type"
                        onChange={changeGameState}>
                        <option value="0">{currentGame.game_type}</option>
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
                <input
                    name="skill_level"
                    class="form_select"
                    value={currentGame.skill_level}
                    onChange={changeGameState}
                    type="number"
                    max="5"
                    min="1">
                </input>
            </fieldset>
            <button type="submit"
                onClick={(evt) => {
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        numberOfPlayers: parseInt(currentGame.number_of_players),
                        skillLevel: parseInt(currentGame.skill_level),
                        gameType: parseInt(currentGame.game_type),
                        id: parseInt(currentGame.id)
                    }

                    completeUpdate(game)
                        .then(() => navigate("/"))
                }}
                className="btn btn-primary">Update</button>
        </form >
    )
}