import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { search } from '../scraper';
import MyCard from './MyCard';
import { Link } from 'react-router-dom';

const AnimeContainer = ({ searchKey }) => {
	const [animeList, setAnimeList] = useState([]);

	useEffect(() => {
		search(searchKey).then(animelist => {
			setAnimeList(animelist);
		});
	}, [searchKey]);

	return (
		<Container fluid='md'>
			<Row className='justify-centre'>
				{animeList.map((anime, index) => {
					return (
						<Col xs='12' md={6} lg='3' className='my-4' key={index}>
							<Link to={`/anime/${anime.url}`} style={{ textDecoration: 'none' }}>
								<MyCard anime={anime} />
							</Link>
						</Col>
					);
				})
				}
			</Row>
		</Container>
	)
}

export default AnimeContainer
