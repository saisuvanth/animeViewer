import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { search } from '../scraper';
import MyCard from './MyCard';
import { auth, db } from '../firebase';
import { getDoc, doc } from 'firebase/firestore';
import styles from '../containers/components.module.css';

const AnimeContainer = ({ searchKey, logged, favs }) => {
	const [animeList, setAnimeList] = useState([]);
	const [animeWishList, setAnimeWishList] = useState([]);
	const [name, setName] = useState('');
	const [wishRenderer, setWishRenderer] = useState(false);

	useEffect(() => {
		if (logged) {
			const uid = auth.currentUser.uid;
			getDoc(doc(db, 'users', uid)).then((docInfo) => {
				const data = docInfo.data();
				setName(data.name);
				setAnimeWishList(data.favs);
			});
		}
	}, [logged, wishRenderer, favs])

	useEffect(() => {
		search(searchKey, animeWishList).then(animelist => {
			setAnimeList(animelist);
		});
	}, [searchKey, animeWishList, favs]);

	return (
		<Container fluid='md' style={{ minHeight: '100vh' }}>
			{favs ? <h2 className={styles.nameHead}>Welcome Back <span className={styles.name}>{name}</span> !</h2> : null}
			<Row className='justify-centre'>
				{favs ? animeWishList.map((anime, index) => {
					return (
						<Col xs='12' md={6} lg='3' className='my-4' key={index}>
							<MyCard anime={anime} logged={logged} setWishlist={setAnimeWishList} renderer={setWishRenderer} />
						</Col>
					);
				}) :
					animeList.map((anime, index) => {
						return (
							<Col xs='12' md={6} lg='3' className='my-4' key={index}>
								<MyCard anime={anime} logged={logged} setWishlist={setAnimeWishList} renderer={setWishRenderer} />
							</Col>
						);
					})
				}
			</Row>
		</Container>
	)
}

export default AnimeContainer
