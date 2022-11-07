import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { getGames } from '../../managers/GameManager.js'
import { createEvent } from "../../managers/EventManager.js"


export const EventForm = () => {

    const navigate = useNavigate()
    const [games, setGames] = useState([])

    const [currentEvent, setCurrentEvent] = useState({
        game: 0,
        description: "",
        time: "",
        date: ""
    })


    useEffect(
        () => {
            getGames().then(games => setGames(games))
        },
        []
    )

    const changeEventState = (domEvent) => {
        const newEvent = Object.assign({}, currentEvent)
        newEvent[domEvent.target.name] = domEvent.target.value
        setCurrentEvent(newEvent)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="type">Which Game Will You Play?</label>
                    <select
                        class="form_select"
                        name="game"
                        onChange={changeEventState}>
                        <option value="0">Choose Game</option>
                        {
                            games.map(
                                (game) => {
                                    return <option className="form-option" value={`${game.id}`}>{game.title}</option>
                                }
                            )
                        }
                    </select>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const event = {
                        game: currentEvent.game,
                        organizer: currentEvent.organizer,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        description: currentEvent.description
                    }

                    createEvent(event)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form >
    )
}