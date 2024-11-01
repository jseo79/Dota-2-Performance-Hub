import React, { useState, useEffect } from 'react';

const RecentMatches: React.FC<{ matches: any[] | null; heroes: any[] }> = ({
	matches,
	heroes,
}) => {
	const [heroData, setHeroData] = useState<
		{ heroName: string; imageUrl: string }[]
	>([]);

	useEffect(() => {
		if (matches && heroes) {
			const data = matches.map((match) => {
				const hero = heroes.find((hero) => hero.id === match.hero_id);
				return hero
					? { heroName: hero.heroName, imageUrl: hero.imageUrl }
					: { heroName: 'Unknown Hero', imageUrl: '' };
			});
			setHeroData(data);
		}
	}, [matches, heroes]);

	return (
		<div className="recent-matches-container">
			<h2>Recent Matches</h2>
			{matches && matches.length > 0 ? (
				<table className="matches-table">
					<thead>
						<tr>
							<th>Hero</th>
							<th></th>
							<th>Result</th>
							<th>Duration</th>
							<th>KDA</th>
						</tr>
					</thead>
					<tbody>
						{matches.map((match, index) => {
							const playerSlot = match.player_slot;
							const result =
								(match.radiant_win &&
									playerSlot >= 0 &&
									playerSlot <= 4) ||
								(!match.radiant_win &&
									playerSlot >= 128 &&
									playerSlot <= 132);

							const heroInfo = heroData[index] || {
								heroName: 'Unknown Hero',
								imageUrl: '',
							};

							return (
								<tr key={match.match_id}>
									<td>
										<img
											src={heroInfo.imageUrl}
											alt={`Hero: ${heroInfo.heroName}`}
											style={{
												width: '50px',
												height: '30px',
											}}
										/>
									</td>
									<td>{heroInfo.heroName}</td>
									<td className={result ? 'win' : 'loss'}>
										{result ? 'Win' : 'Loss'}
									</td>
									<td>{formatDuration(match.duration)}</td>
									<td>{`${match.kills}/${match.deaths}/${match.assists}`}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			) : (
				<p>No recent matches found.</p>
			)}
		</div>
	);
};

const formatDuration = (duration: number) => {
	const minutes = Math.floor(duration / 60);
	const seconds = duration % 60;
	return `${minutes}m ${seconds}s`;
};

export { RecentMatches };
