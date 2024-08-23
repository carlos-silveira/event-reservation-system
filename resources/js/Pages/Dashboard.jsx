import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Index from './Events/Index';
import { InertiaLink } from '@inertiajs/inertia-react';

export default function Dashboard({ auth, events }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center ">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Events</h2>
                    <div>
                        <InertiaLink href="/events/create" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                            Create Event
                        </InertiaLink>
                    </div>
                </div>
            }
        >
            <Head title="Events" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Index events={events}></Index>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
