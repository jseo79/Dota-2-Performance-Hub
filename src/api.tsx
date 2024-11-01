import axios from 'axios';

const BASE_URL = 'https://api.opendota.com/api';
const HERO_IMAGE_BASE_URL = 'http://cdn.dota2.com/apps/dota2/images/heroes/';

const getAccountId = async (username: string) => {
	try {
		const response = await axios.get(`${BASE_URL}/search`, {
			params: {
				q: username,
			},
		});
		if (response.data) {
			const accountId = response.data[0]?.account_id;
			// console.log(accountId);
			return accountId;
		}
	} catch (error) {
		console.error('Error fetching account', error);
		throw error;
	}
};

const getRecentMatches = async (accountId: number) => {
	try {
		const response = await axios.get(
			`${BASE_URL}/players/${accountId}/recentMatches`,
			{
				params: {
					account_id: accountId,
				},
			}
		);
		if (response.data) {
			const recentMatches = response.data;
			console.log(recentMatches);
			return recentMatches;
		}
	} catch (error) {
		console.error('Error fetching recent matches', error);
		throw error;
	}
};

const fetchAllHeroes = async () => {
	try {
		const response = await axios.get(`${BASE_URL}/heroes`);
		const allHeroesArray = response.data.map(
			(hero: { id: number; localized_name: string; name: string }) => ({
				id: hero.id,
				imageUrl: `${HERO_IMAGE_BASE_URL}${hero.name.replace(
					'npc_dota_hero_',
					''
				)}_full.png`,
				heroName: hero.localized_name,
			})
		);
		console.log(allHeroesArray);
		return allHeroesArray;
	} catch (error) {
		console.error('Error fetching heroes', error);
		throw error;
	}
};

export { getAccountId, getRecentMatches, fetchAllHeroes };
