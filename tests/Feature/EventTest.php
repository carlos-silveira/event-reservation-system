<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Event;
use Illuminate\Foundation\Testing\RefreshDatabase;

class EventTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_event()
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->post('/events', [
            'title' => 'Test Event',
            'description' => 'This is a test event',
            'event_date' => now()->addDays(7),
            'location' => 'Test Location',
            'price' => 100,
            'attendee_limit' => 100,
        ]);
        $response->assertRedirect('/dashboard');
        $this->assertDatabaseHas('events', [
            'title' => 'Test Event',
            'description' => 'This is a test event',
            'event_date' => now()->addDays(7),
            'location' => 'Test Location',
            'price' => 100,
            'attendee_limit' => 100,
        ]);
    }

    public function test_user_can_reserve_events_tickets()
    {
        $user = User::factory()->create();
        $event = Event::factory()->create();

        $response = $this->actingAs($user)->post('/events/' . $event->id . '/reserve', [
            'numberOfTickets' => 5,
        ]);
    
        $this->assertDatabaseHas('reservations', [
            'event_id' => $event->id,
            'user_id' => $user->id,
            'number_of_tickets' => 5,
        ]);
    }
}
