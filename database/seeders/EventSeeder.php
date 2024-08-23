<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $events = [
            [
                'title' => 'Pal Norte',
                'description' => 'Music festival in Monterrey',
                'event_date' => now()->subDays(1),
                'location' => 'Monterrey',
                'price' => 1000,
                'attendee_limit' => 1000,
            ],
            [
                'title' => 'Live Out',
                'description' => 'Music festival in Monterrey',
                'event_date' => now()->addDays(1),
                'location' => 'Monterrey',
                'price' => 800,
                'attendee_limit' => 800,
            ],
            [
                'title' => 'Corona Capital',
                'description' => 'Music festival in Mexico City',
                'event_date' => now()->addDays(2),
                'location' => 'Mexico City',
                'price' => 1200,
                'attendee_limit' => 1200,
            ],
            [
                'title' => 'Vive Latino',
                'description' => 'Music festival in Mexico City',
                'event_date' => now()->addDays(3),
                'location' => 'Mexico City',
                'price' => 1500,
                'attendee_limit' => 1500,
            ],
            [
                'title' => 'EDC Mexico',
                'description' => 'Music festival in Mexico City',
                'event_date' => now()->addDays(4),
                'location' => 'Mexico City',
                'price' => 2000,
                'attendee_limit' => 2000,
            ],
        ];

        foreach ($events as $event) {
           Event::create($event);
        }
    }
}
