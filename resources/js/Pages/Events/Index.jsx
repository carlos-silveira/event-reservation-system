import React, { useState, useEffect } from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import axios from 'axios';

export default function Events({ events }) {
    const [reservationStatus, setReservationStatus] = useState(null);
    const [registeredEvents, setRegisteredEvents] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        events.forEach(event => {
            axios.get(`/events/${event.id}/check-availability`)
                .then(response => {
                    setRegisteredEvents(prevState => ({
                        ...prevState,
                        [event.id]: response.data.isRegistered
                    }));
                })
                .catch(error => {
                    console.error('Error checking registration status:', error);
                });
        });
    }, [events]);

    function handleReserveTickets(eventId, event) {
        const numberOfTickets = prompt('Enter the number of tickets you require:');
        if (numberOfTickets) {
            axios.post(`/events/${eventId}/reserve`, { numberOfTickets })
                .then(response => {
                    if (response.data.success) {
                        setReservationStatus('success');
                    } else {
                        setReservationStatus('error');
                        setError(response.data.error);
                    }
                })
                .catch(error => {
                    console.error('Reservation failed:', error);
                    setReservationStatus('error');
                });
        }
        event.preventDefault();
    }

    return (
        <div>
            {events.length === 0 ? (
                <h1 className="p-4">We don't have events created yet.</h1>
            ) : (
                <div className="p-4 grid grid-cols-3 gap-4">
                    {events.map(event => (
                        <div key={event.id} className="bg-white rounded-lg border border-gray-300 p-4 pl-6 mb-4" style={{ width: '300px' }}>
                            <h2 className="text-lg font-bold mb-2 text-center">{event.title}</h2>
                            <p className="text-gray-500 mb-2 text-center">{event.description}</p>
                            <p className="text-gray-500 mb-2 text-center">{event.location}</p>
                            <p className="text-gray-500 mb-2 text-center">{new Date(event.event_date).toLocaleString()}</p>
                            <p className="text-gray-500 mb-2 text-center">${event.price}</p>
                            <p className="text-gray-500 mb-2 text-center">Attendees: {event.total_tickets}/{event.attendee_limit}</p>
                            <div className="flex justify-center">
                                <InertiaLink
                                    href={`/events/${event.id}/reserve`}
                                    method="post"
                                    className={`bg-blue-500 text-white px-4 py-2 rounded-md ${registeredEvents[event.id] || event.total_tickets === event.attendee_limit ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={(e) => !registeredEvents[event.id] && handleReserveTickets(event.id, e)}
                                    disabled={registeredEvents[event.id] || event.total_tickets === event.attendee_limit}
                                >
                                    {registeredEvents[event.id] ? 'Already Registered' : 'Reserve Tickets'}
                                </InertiaLink>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {reservationStatus === 'success' && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg w-64 h-64 flex flex-col items-center justify-center">
                        <svg className="text-green-500 w-12 h-12 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M9 12l2 2 4-4" />
                        </svg>
                        <h2 className="text-lg font-bold mb-2 text-center">Success!</h2>
                        <p className="text-gray-500 mb-2 text-center">You will receive your tickets via email.</p>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => setReservationStatus(null)}>Close</button>
                    </div>
                </div>
            )}
            {reservationStatus === 'error' && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg w-64 h-64 flex flex-col items-center justify-center">
                        <svg className="text-red-500 w-12 h-12 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="15" y1="9" x2="9" y2="15" />
                            <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                        <h2 className="text-lg font-bold mb-2 text-center">Reservation failed</h2>
                        <p className="text-gray-500 mb-2 text-center">{error}</p>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => setReservationStatus(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}
