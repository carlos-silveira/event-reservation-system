import { Link, Head } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Welcome({ auth }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <img
                    id="background"
                    className="absolute top-0 "
                    src="https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg"
                    alt="Background"
                />
                <div className="relative min-h-screen flex flex-col items-center justify-center selection:bg-[#0096FF] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="flex justify-between items-center py-6 lg:py-10">
                            <div className="flex items-center space-x-4">
                            <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                <h1 className="text-2xl font-bold text-[#0096FF] dark:text-white">
                                    Event Registration System
                                </h1>
                            </div>
                            <nav className="flex space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-4 py-2 text-white bg-[#0096FF] hover:bg-[#e62e1e] focus:outline-none focus:ring-2 focus:ring-[#0096FF] dark:bg-[#0096FF] dark:hover:bg-[#e62e1e]"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-4 py-2 text-[#0096FF] border border-[#0096FF] hover:bg-[#0096FF] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#0096FF]"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md px-4 py-2 text-[#0096FF] border border-[#0096FF] hover:bg-[#0096FF] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#0096FF]"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-6">
                            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                                <div
                                    className="flex flex-col items-start gap-6 overflow-hidden rounded-lg bg-white p-6 shadow-lg ring-1 ring-gray-200 transition duration-300 hover:ring-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0096FF]"
                                >
                                    <div
                                        id="screenshot-container"
                                        className="relative flex w-full flex-1 items-stretch"
                                    >
                                        <img
                                            src="https://images.unsplash.com/photo-1642784353101-89f45a2e4e10?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                            alt="Event Registration"
                                            className="aspect-video h-full w-full flex-1 rounded-[10px] object-cover"
                                            onError={handleImageError}
                                        />
                                    </div>

                                    <div id="docs-card-content" className="flex items-start gap-6">
                                        <div className="flex items-center justify-center rounded-full bg-[#0096FF]/10">
                                        </div>

                                        <div>
                                            <h2 className="text-xl font-semibold text-black dark:text-white">
                                                Events creation
                                            </h2>

                                            <p className="mt-4 text-sm">
                                                Create your events and see the event from other users.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="flex flex-col items-start gap-6 overflow-hidden rounded-lg bg-white p-6 shadow-lg ring-1 ring-gray-200 transition duration-300 hover:ring-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0096FF]"
                                >
                                    <div
                                        id="screenshot-container"
                                        className="relative flex w-full flex-1 items-stretch"
                                    >
                                        <img
                                            src="https://cdn.pixabay.com/photo/2019/05/05/17/32/stadium-4181150_1280.jpg"
                                            alt="Reserve tickets"
                                            className="aspect-video h-full w-full flex-1 rounded-[10px] object-cover"
                                            onError={handleImageError}
                                        />
                                    </div>

                                    <div id="docs-card-content" className="flex items-start gap-6">
                                        <div className="flex items-center justify-center rounded-full bg-[#0096FF]/10">
                                        </div>

                                        <div>
                                            <h2 className="text-xl font-semibold text-black dark:text-white">
                                                Reserve tickets
                                            </h2>

                                            <p className="mt-4 text-sm">
                                                You can book tickets for the events you want to attend.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}
