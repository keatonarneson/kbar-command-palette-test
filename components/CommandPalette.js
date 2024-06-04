'use client';

import {
    KBarPortal,
    KBarPositioner,
    KBarAnimator,
    KBarSearch,
    KBarResults,
    useMatches,
} from 'kbar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useSearchActions from '../hooks/useSearchActions';
import '../styles/commandPalette.css';

function CommandPalette() {
    const { results } = useMatches();
    const [pastSearches, setPastSearches] = useState([]);
    const { actions, selectedTeam, selectedParameters, storePastSearch } =
        useSearchActions();
    const router = useRouter();

    useEffect(() => {
        const searches = JSON.parse(
            localStorage.getItem('pastSearches') || '[]'
        );
        setPastSearches(searches);
    }, []);

    const handlePastSearchClick = url => {
        router.push(url);
    };

    const updateRoute = parameters => {
        const queryParams = new URLSearchParams(parameters).toString();
        if (selectedTeam) {
            const url = `https://www.fangraphs.com/teams/${selectedTeam}?${queryParams}`;
            storePastSearch(url);
            router.push(url);
        } else {
            alert('Please select a team first.');
        }
    };

    const updatedActions = actions.map(action => {
        if (action.id.startsWith('team-')) {
            return {
                ...action,
                perform: () => {
                    action.perform();
                    updateRoute(selectedParameters);
                },
            };
        }
        if (action.parent === `team-${selectedTeam}`) {
            return {
                ...action,
                perform: () => {
                    action.perform();
                    updateRoute({
                        ...selectedParameters,
                        [action.id.split('-')[1]]: action.name
                            .split(' ')[0]
                            .toLowerCase(),
                    });
                },
            };
        }
        return action;
    });

    return (
        <KBarPortal>
            <KBarPositioner className="kbar-positioner">
                <KBarAnimator className="kbar-animator">
                    <KBarSearch className="kbar-search" />
                    <KBarResults
                        items={updatedActions.concat(
                            pastSearches.map(search => ({
                                name: `Past Search: ${search.url}`,
                                perform: () =>
                                    handlePastSearchClick(search.url),
                            }))
                        )}
                        onRender={({ item, active }) =>
                            typeof item === 'string' ? (
                                <div className="kbar-result">{item}</div>
                            ) : (
                                <div
                                    className={`kbar-result ${
                                        active ? 'active' : ''
                                    }`}
                                    onClick={item.perform}
                                >
                                    {item.name}
                                </div>
                            )
                        }
                    />
                </KBarAnimator>
            </KBarPositioner>
        </KBarPortal>
    );
}

export default CommandPalette;
