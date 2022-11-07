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


    const deleteEvent = (eventId) => {
        return fetch(
            `http://localhost:8000/events/${eventId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Token ${localStorage.getItem("lu_token")}`
                },
            }
        ).then(() => {
            fetch(`http://localhost:8000/events`, {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("lu_token")}`
                }
            })
                .then(response => response.json())
                .then((eventsArray) => {
                    setEvents(eventsArray)
                })

        })
    }


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
                        <button className="edit__event"
                            onClick={() => {
                                navigate({ pathname: `/events/${event.id}` })
                            }}>Edit Event</button>
                        <button className="delete__event"
                            onClick={() => {
                                deleteEvent(event.id)
                            }}>Delete</button>
                    </section>
                })
            }
        </article>
    )
}