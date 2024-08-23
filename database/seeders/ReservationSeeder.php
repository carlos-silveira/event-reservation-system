<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Event;
use App\Models\Reservation;
use Illuminate\Database\Seeder;

class ReservationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $event = Event::first();
        $user = User::where('email', "test@example.com")->first();
        $reservation = [
            'event_id' => $event->id ?? null,
            'user_id' => $user->id ?? null,
            'number_of_tickets' => $event->attendee_limit,
        ];
        Reservation::create($reservation);
    }
}
