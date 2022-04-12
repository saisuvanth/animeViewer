import cheerio from 'cheerio';
import axios from 'axios';
const limit = 20;

const search = async (key = null, wishlist) => {
	let markup = await axios.get(key ? `https://gogoanime.run//search.html?keyword=${key}` : 'https://gogoanime.run/popular.html');
	const $ = cheerio.load(markup.data);
	let data = [];
	const list = $('.items > li');
	list.each((id, el) => {
		const url = $(el).find('a').attr('href').split('/').pop();
		const img = $(el).find('img').attr('src');
		const name = $(el).find('.name').text().trim();
		const date = $(el).find('.released').text().trim();
		let fav = false;
		for (let index = 0; index < wishlist.length; index++) {
			if (wishlist[index].url === url) { fav = true; break; }
			else continue;
		}
		data.push({ url: url, img: img, name: name, date: date, fav: fav });
	});
	return data;
}

const anime = async (id) => {
	let markup = await axios.get(`https://gogoanime.run/category/${id}`);
	const $ = cheerio.load(markup.data);
	const episodes = parseInt($('#episode_page > li:last-child').text().trim().split('-')[1]);
	const [, type, description, genre, date, status, other] = $('.anime_info_body_bg > p');
	let data = {
		name: $('.anime_info_body_bg > h1').text().trim(),
		img: $('.anime_info_body_bg > img').attr('src'),
		type: $(type).children('a').text().trim(),
		description: $(description).text().split(':').pop('').trim().replace(/[\t\n]+/g, ''),
		genre: $(genre).children('a').text().trim(),
		date: $(date).text().split(':').pop('').trim(),
		status: $(status).children('a').text().trim(),
		other: $(other).text().split(':').pop('').trim(),
		episodes: episodes
	};
	return data;
}

const episodeNumber = async (id) => {
	let markup = await axios.get(`https://gogoanime.run/category/${id}`);
	let $ = cheerio.load(markup.data);
	let episodes = parseInt($('#episode_page > li:last-child').text().trim().split('-')[1]);
	return episodes;
}

const episodes = async (id, episodes, pageNumber = 1) => {
	let start = (pageNumber - 1) * limit, i = 0;
	let data = { start: start, totalEpisodes: episodes, result: [] }, url = `https://gogoanime.run/${id}-episode-`;
	while (i++ < limit && ++start <= episodes) {
		data.result.push({ episode: start, episodeUrl: `${url}${start}` });
	}
	return data;
}

const getEpisodeVideo = async (url) => {
	const markup = await axios.get(url);
	const $ = cheerio.load(markup.data);
	return $('iframe').attr('src');
}

export { search, anime, episodes, episodeNumber, getEpisodeVideo };
