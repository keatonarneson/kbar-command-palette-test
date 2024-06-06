'use client';

import { useKBar } from 'kbar';

export default function HomePage() {
    const { query } = useKBar();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-bold mb-4">
                <a
                    href="https://www.npmjs.com/package/kbar"
                    className="text-blue-600 hover:underline"
                >
                    Command Palette Example using kbar
                </a>
            </h1>
            <h2 className="text font-bold mb-4">
                <a
                    href="https://kbar.vercel.app/docs/overview"
                    className="text-black-600 hover:underline"
                >
                    kbar Documentation
                </a>
            </h2>
            <p className="text-lg mb-4">
                Use the command palette to search for teams and apply filters by
                using <strong>CTRL-K</strong>.
            </p>
            <button
                onClick={() => query.toggle()}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring"
            >
                Open Command Palette
            </button>
        </div>
    );
}
