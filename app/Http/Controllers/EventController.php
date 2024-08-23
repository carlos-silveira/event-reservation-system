<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::with('reservations')->get();
        $events->each(function ($event) {
            $event->total_tickets = $event->reservations->sum('number_of_tickets');
        });
        return Inertia::render('Dashboard', [
            'events' => $events,
        ]);
    }

    public function create()
    {
        return Inertia::render('Events/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'event_date' => 'required|date|after:today',
            'location' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'attendee_limit' => 'required|integer|min:1',
        ]);

        Event::create($request->all());

        return redirect()->route('dashboard');
    }
}
