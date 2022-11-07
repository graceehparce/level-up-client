import React, { useEffect } from "react"
import { getEvents } from "../../managers/EventManager.js"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const EventList = (props) => {
    const [events, setEvents] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/events/new" })
                }}
            >Register New Event</button>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event_game">We will be playing {event.game.title}</div>
                        <div className="event_description">What to expect: {event.description}</div>
                        <div className="event_date">Date: {event.date} </div>
                        <div className="event_time">Time: {event.time}</div>
                    </section>
                })
            }
        </article>
    )
}