import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { getGameTypes } from '../../managers/GameManager.js'
import { useParams } from "react-router-dom"
import { EventList } from "./EventList.js"
import { getGames } from "../../managers/GameManager.js"

export const UpdateEvent = () => {

    const navigate = useNavigate()
    const { eventId } = useParams()
    const [games, setGames] = useState([])

    const [event, setEvent] = useState({})

    useEffect(
        () => {
            getGames().then(games => setGames(games))
        },
        []
    )

    useEffect(
        () => {
            fetch(`http://localhost:8000/events/${eventId}`, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("lu_token")}`
                }
            })
                .then(response => response.json())
                .then((eventObject) => {
                    setEvent(eventObject)
                })
        },
        [eventId])




    const completeUpdate = (evt) => {
        return fetch(`http://localhost:8000/events/${eventId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("lu_token")}`,

                "Content-Type": "application/json"
            },
            body: JSON.stringify(evt)
        })
            .then(() => {
                navigate(`/events`)
            })
    }

    const changeEventState = (domEvent) => {
        const updatedEvent = Object.assign({}, event)
        updatedEvent[domEvent.target.name] = domEvent.target.value
        setEvent(updatedEvent)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Update Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Description: </label>
                    <input placeholder={event.description} type="text" name="description" required autoFocus className="form-control"
                        value={event.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input placeholder={event.time} type="time" name="time" required autoFocus className="form-control"
                        value={event.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input placeholder={event.date} type="date" name="date" required autoFocus className="form-control"
                        value={event.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="type">Which Game?</label>
                    <select
                        class="form_select"
                        name="game"
                        onChange={changeEventState}>
                        <option value="0">{event?.game?.title}</option>
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
                onClick={(evt) => {
                    evt.preventDefault()

                    const editEvent = {
                        description: event.description,
                        date: event.date,
                        time: event.time,
                        game: parseInt(event.game.id),
                        id: parseInt(event.id),
                        organizer: parseInt(event.organizer.id)
                    }

                    completeUpdate(editEvent)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Update</button>
        </form >
    )
}