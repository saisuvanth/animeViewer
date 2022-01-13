import cheerio from 'cheerio';
import axios from 'axios';
const limit = 20;

const search = async (key = null) => {
	let markup = await axios.get(key ? `https://gogoanime.film//search.html?keyword=${key}` : 'https://gogoanime.film/popular.html');
	const $ = cheerio.load(markup.data);
	let data = [];
	const list = $('.items > li');
	list.each((id, el) => {
		const url = $(el).find('a').attr('href').split('/').pop();
		const img = $(el).find('img').attr('src');
		const name = $(el).find('.name').text().trim();
		const date = $(el).find('.released').text().trim();
		data.push({ url: url, img: img, name: name, date: date });
	});
	return data;
}

const anime = async (id) => {
	let markup = await axios.get(`https://gogoanime.film/category/${id}`);
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
	let markup = await axios.get(`https://gogoanime.film/category/${id}`);
	let $ = cheerio.load(markup.data);
	let episodes = parseInt($('#episode_page > li:last-child').text().trim().split('-')[1]);
	return episodes;
}

const episodes = async (id, episodes, pageNumber = 1) => {
	let start = (pageNumber - 1) * limit, i = 0;
	let data = { start: start, totalEpisodes: episodes, result: [] }, url = `https://gogoanime.film/${id}-episode-`;
	while (i++ < limit && ++start <= episodes) {
		const markup = await axios.get(`${url}${start}`);
		const $ = cheerio.load(markup.data);
		data.result.push({ episode: start, url: $('iframe').attr('src') });
	}
	return data;
}

// episodes('naruto-dub', 216, 22).then(res => console.log(res));
// search().then((res) => console.log(res));
// anime('/category/horimiya').then((res) => console.log(res));
export { search, anime, episodes, episodeNumber };