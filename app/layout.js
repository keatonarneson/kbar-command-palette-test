'use client';

import SearchProvider from '../components/SearchProvider';
import CommandPalette from '../components/CommandPalette';
import './globals.css';

export default function RootLayout({ children }) {
    return (
        <SearchProvider>
            <html lang="en">
                <body>
                    {children}
                    <CommandPalette />
                </body>
            </html>
        </SearchProvider>
    );
}
