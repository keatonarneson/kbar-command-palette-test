'use client';

import { useState, useEffect } from 'react';

const teams = [
    { id: '1', name: 'Angels' },
    { id: '2', name: 'Orioles' },
    { id: '3', name: 'Red Sox' },
    { id: '4', name: 'White Sox' },
    { id: '5', name: 'Guardians' },
    { id: '6', name: 'Tigers' },
    { id: '7', name: 'Royals' },
    { id: '8', name: 'Twins' },
    { id: '9', name: 'Yankees' },
    { id: '10', name: 'Athletics' },
    { id: '11', name: 'Mariners' },
    { id: '12', name: 'Rays' },
    { id: '13', name: 'Rangers' },
    { id: '14', name: 'Blue Jays' },
    { id: '15', name: 'Diamondbacks' },
    { id: '16', name: 'Braves' },
    { id: '17', name: 'Cubs' },
    { id: '18', name: 'Reds' },
    { id: '19', name: 'Rockies' },
    { id: '20', name: 'Marlins' },
    { id: '21', name: 'Astros' },
    { id: '22', name: 'Dodgers' },
    { id: '23', name: 'Brewers' },
    { id: '24', name: 'Nationals' },
    { id: '25', name: 'Mets' },
    { id: '26', name: 'Phillies' },
    { id: '27', name: 'Pirates' },
    { id: '28', name: 'Cardinals' },
    { id: '29', name: 'Padres' },
    { id: '30', name: 'Giants' },
];

export default function useSearchActions() {
    const [selectedTeam, setSelectedTeam] = useState('');
    const [actions, setActions] = useState([]);

    const setTeam = team => {
        setSelectedTeam(team);
    };

    const storePastSearch = url => {
        const pastSearches = JSON.parse(
            localStorage.getItem('pastSearches') || '[]'
        );
        pastSearches.push({ url, timestamp: new Date().toISOString() });
        if (pastSearches.length > 5) {
            pastSearches.shift(); // Keep only the last 5 searches
        }
        localStorage.setItem('pastSearches', JSON.stringify(pastSearches));
    };

    useEffect(() => {
        const baseActions = [
            {
                id: 'teams',
                name: 'Teams',
                shortcut: ['t'],
                section: 'Navigation',
                perform: () => {}, // No navigation here
            },
            {
                id: 'players',
                name: 'Players',
                shortcut: ['p'],
                section: 'Navigation',
                perform: () => setTeam('Players'),
            },
            {
                id: 'leaders',
                name: 'Leaders',
                shortcut: ['l'],
                section: 'Navigation',
                perform: () => setTeam('Leaders'),
            },
        ];

        const teamActions = teams.map(team => ({
            id: `team-${team.name}`,
            name: team.name,
            parent: 'teams',
            perform: () => setTeam(team.name),
        }));

        setActions([...baseActions, ...teamActions]);
    }, []);

    return { actions, selectedTeam, storePastSearch, setTeam };
}
