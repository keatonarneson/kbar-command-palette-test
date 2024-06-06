'use client';
import {
    KBarPortal,
    KBarPositioner,
    KBarAnimator,
    KBarSearch,
    KBarResults,
    useMatches,
    useRegisterActions,
} from 'kbar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useSearchActions from '../hooks/useSearchActions';

function CommandPalette() {
    const router = useRouter();
    const { results } = useMatches();
    const [showTeams, setShowTeams] = useState(false);
    const [pastSearches, setPastSearches] = useState([]);
    const { actions, selectedTeam, storePastSearch, setTeam } =
        useSearchActions();

    useRegisterActions(actions, [actions]);

    useEffect(() => {
        const searches = JSON.parse(
            localStorage.getItem('pastSearches') || '[]'
        );
        setPastSearches(searches);
    }, []);

    useEffect(() => {
        if (selectedTeam) {
            const url = `https://www.fangraphs.com/teams/${selectedTeam}`;
            storePastSearch(url);
            setShowTeams(false); // Close the submenu after selecting a team
            router.push(url);
        }
    }, [selectedTeam, router, storePastSearch]);

    const handleTeamsClick = () => {
        setShowTeams(true);
    };

    const handleBackClick = () => {
        setShowTeams(false);
        setTeam(''); // Reset selectedTeam when going back
    };

    const navigationItems = results.filter(
        item =>
            item.section === 'Navigation' && (!showTeams || item.id === 'teams')
    );
    const teamItems = results.filter(item => item.parent === 'teams');
    const pastSearchItems = pastSearches.map(search => ({
        id: search.url,
        name: `Past Search: ${search.url}`,
        perform: () => router.push(search.url),
    }));

    return (
        <div className="kbar-container">
            <KBarPortal>
                <KBarPositioner className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center">
                    <KBarAnimator className="w-full max-w-2xl p-4 bg-white rounded-lg shadow-lg">
                        <KBarSearch
                            className="w-full p-3 text-lg border-b border-gray-200 outline-none"
                            placeholder="Type a command or search..."
                            onKeyDown={e => {
                                if (e.key !== 'Escape') {
                                    setShowTeams(false);
                                }
                            }}
                        />
                        {showTeams ? (
                            <div className="mt-4">
                                <button
                                    onClick={handleBackClick}
                                    className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                >
                                    Back
                                </button>
                                <div className="p-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    Teams
                                </div>
                                <KBarResults
                                    items={teamItems}
                                    onRender={({ item, active }) => (
                                        <div
                                            key={item.id}
                                            className={`team-item p-3 text-sm cursor-pointer flex items-center justify-between ${
                                                active ? 'bg-gray-100' : ''
                                            }`}
                                            onClick={item.perform}
                                        >
                                            <div>{item.name}</div>
                                        </div>
                                    )}
                                />
                            </div>
                        ) : (
                            <>
                                {navigationItems.length > 0 && (
                                    <div className="mt-4">
                                        <div className="p-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                            Navigation
                                        </div>
                                        <KBarResults
                                            items={navigationItems}
                                            onRender={({ item, active }) => (
                                                <div
                                                    key={item.id}
                                                    className={`navigation-item p-3 text-sm cursor-pointer flex items-center justify-between ${
                                                        active
                                                            ? 'bg-gray-100'
                                                            : ''
                                                    }`}
                                                    onClick={
                                                        item.id === 'teams'
                                                            ? handleTeamsClick
                                                            : item.perform
                                                    }
                                                >
                                                    <div>{item.name}</div>
                                                    {item.shortcut && (
                                                        <div className="text-xs text-gray-400">
                                                            {item.shortcut.map(
                                                                (sc, index) => (
                                                                    <kbd
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="px-2 py-1 ml-1 bg-gray-200 rounded"
                                                                    >
                                                                        {sc}
                                                                    </kbd>
                                                                )
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        />
                                    </div>
                                )}
                                {pastSearchItems.length > 0 && (
                                    <div className="mt-4">
                                        <div className="p-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                            Past Searches
                                        </div>
                                        <KBarResults
                                            items={pastSearchItems}
                                            onRender={({ item, active }) => (
                                                <div
                                                    key={item.id}
                                                    className={`past-search-item p-3 text-sm cursor-pointer flex items-center justify-between ${
                                                        active
                                                            ? 'bg-gray-100'
                                                            : ''
                                                    }`}
                                                    onClick={item.perform}
                                                >
                                                    <div>{item.name}</div>
                                                </div>
                                            )}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </KBarAnimator>
                </KBarPositioner>
            </KBarPortal>
        </div>
    );
}

export default CommandPalette;
