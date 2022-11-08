import React, { useEffect } from "react"
import { getGames } from "../../managers/GameManager.js"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const GameList = (props) => {
    const [games, setGames] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    const deleteGame = (gameId) => {
        return fetch(
            `http://localhost:8000/games/${gameId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Token ${localStorage.getItem("lu_token")}`
                },
            }
        ).then(() => {
            fetch(`http://localhost:8000/games`, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("lu_token")}`
                }
            })
                .then(response => response.json())
                .then((gamesArray) => {
                    setGames(gamesArray)
                })

        })
    }

    return (
        <article className="games">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/games/new" })
                }}
            >Register New Game</button>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} by {game.maker}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        <button className="edit__game"
                            onClick={() => {
                                navigate({ pathname: `/games/${game.id}` })
                            }}>Edit Game</button>
                        <button className="delete__game"
                            onClick={() => {
                                deleteGame(game.id)
                            }}>Delete</button>
                    </section>
                })
            }
        </article>
    )
}