'use client';

import { KBarProvider } from 'kbar';
import useSearchActions from '../hooks/useSearchActions';

export default function SearchProvider({ children }) {
    const { actions } = useSearchActions();

    return <KBarProvider actions={actions}>{children}</KBarProvider>;
}
