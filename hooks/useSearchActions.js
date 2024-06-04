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

const details = [
    { id: 'team-page', name: 'Team Page' },
    { id: 'roster-resource', name: 'Roster Resource' },
    { id: 'team-leaders', name: 'Team Leaders' },
];

const parameters = [
    {
        id: 'timeframe-last7',
        name: 'Last 7 Days',
        key: 'timeframe',
        value: 'last7',
    },
    {
        id: 'timeframe-last14',
        name: 'Last 14 Days',
        key: 'timeframe',
        value: 'last14',
    },
    {
        id: 'timeframe-last30',
        name: 'Last 30 Days',
        key: 'timeframe',
        value: 'last30',
    },
    {
        id: 'timeframe-season',
        name: 'Season',
        key: 'timeframe',
        value: 'season',
    },
    { id: 'stat-homeruns', name: 'Home Runs', key: 'stat', value: 'homeruns' },
    { id: 'stat-rbi', name: 'RBI', key: 'stat', value: 'rbi' },
    // Add more parameters
];

export default function useSearchActions() {
    const [selectedTeam, setSelectedTeam] = useState('');
    const [selectedParameters, setSelectedParameters] = useState({});
    const [actions, setActions] = useState([]);

    const setTeam = team => {
        setSelectedTeam(team);
        setSelectedParameters({}); // Reset parameters when a new team is selected
    };

    const addParameter = (key, value) => {
        setSelectedParameters(prev => {
            const newParameters = { ...prev, [key]: value };
            return newParameters;
        });
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

    const viewPastSearches = () => {
        const pastSearches = JSON.parse(
            localStorage.getItem('pastSearches') || '[]'
        );
        pastSearches.forEach(search =>
            console.log(`Past Search: ${search.url}`)
        );
    };

    useEffect(() => {
        const baseActions = [
            {
                id: 'search-teams',
                name: 'Teams (T)',
                keywords: 'teams',
                perform: () => console.log('Teams selected...'),
            },
        ];

        const teamActions = teams.map(team => ({
            id: `team-${team.name}`,
            name: team.name,
            parent: 'search-teams',
            perform: () => setTeam(team.name),
        }));

        const detailActions = details.map(detail => ({
            id: `detail-${detail.id}`,
            name: detail.name,
            parent: selectedTeam ? `team-${selectedTeam}` : '',
            perform: () => console.log(`${detail.name} selected`),
        }));

        setActions([...baseActions, ...teamActions, ...detailActions]);
    }, [selectedTeam]);

    return { actions, selectedTeam, selectedParameters, storePastSearch };
}
