<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function store(Request $request, Event $event)
    {
        $attendeeLimit = $event->attendee_limit;
        $reservedTickets = $event->reservations()->sum('number_of_tickets');
        $availableTickets = $attendeeLimit - $reservedTickets;

        if ($availableTickets <= 0) {
            return response()->json(['error' => 'Event is fully booked!']);
        }

        $reservationDeadline = $event->event_date;

        if ($reservationDeadline && now() > $reservationDeadline) {
            return response()->json(['error' => 'Reservation deadline has passed!']);
        }

        $request->validate([
            'numberOfTickets' => 'required|integer|min:1|max:' . $availableTickets,
        ]);

        try {
            $event->reservations()->create([
                'user_id' => auth()->id(),
                'number_of_tickets' => $request->numberOfTickets,
            ]);

            return response()->json(['success' => 'Reservation successful!']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Reservation failed!']);
        }
    }
    public function checkAvailability(Request $request, Event $event)
    {
        $isRegistered = $event->reservations()->where('user_id', auth()->id())->exists();

        return response()->json(['isRegistered' => $isRegistered]);
    }
}
