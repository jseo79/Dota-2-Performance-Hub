import { useState, useEffect } from 'react';
import { getAccountId, getRecentMatches, fetchAllHeroes } from '../api';
import { RecentMatches } from './RecentMatches';

const AccountIdFetcher = () => {
	const [username, setUsername] = useState('');
	const [accountId, setAccountId] = useState<number | null>(null);
	const [error, setError] = useState<string>('');
	const [matches, setMatches] = useState<any[] | null>(null);
	const [heroes, setHeroes] = useState<any[]>([]);

	useEffect(() => {
		const fetchHeroes = async () => {
			const allHeroes = await fetchAllHeroes();
			setHeroes(allHeroes);
		};

		fetchHeroes();
	}, []);

	const handleFetch = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError('');
		const id = await getAccountId(username);
		if (id) {
			setAccountId(id);
			const recentMatches = await getRecentMatches(id);
			setMatches(recentMatches);
		} else {
			setError(
				'Account ID not found. Please make sure the username is correct'
			);
		}
	};

	return (
		<form id="recent matches" onSubmit={handleFetch}>
			<input
				type="text"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				placeholder="Enter Username"
			></input>
			<button type="submit">Search</button>
			<RecentMatches matches={matches} heroes={heroes} />
		</form>
	);
};

export { AccountIdFetcher };
