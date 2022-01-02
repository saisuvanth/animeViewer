import React, { useState, useEffect } from 'react'
import { anime } from '../scraper';
import { Container, Row } from 'react-bootstrap';
import styles from '../containers/components.module.css';

const SideBar = ({ url, name }) => {
	const [animeData, setAnimeData] = useState({});

	useEffect(() => {
		anime(url).then(res => {
			setAnimeData(res);
			name(res.name);
		});
	}, [url, name]);

	return (
		<Container style={{ color: 'white', paddingTop: '20px', marginRight: '5px' }}>
			<Container className={styles.sidebar}>
				<Row>
					<img src={animeData.img} style={{ height: '400px', width: '350px', padding: '1px', paddingBottom: '5px', borderRadius: '10px' }} alt="" />
				</Row>
				<Row><span className={styles.infoheaders}>Name : </span>
					<p className={styles.info}>{animeData.name}</p>
				</Row>
				<Row ><span className={styles.infoheaders}>Type : </span>
					<p className={styles.info}>{animeData.type}</p>
				</Row>
				<Row ><span className={styles.infoheaders}>Description : </span>
					<p className={styles.info}>{animeData.description}</p>
				</Row>
				<Row><span className={styles.infoheaders}>Genre : </span>
					<p className={styles.info}>{animeData.genre}</p>
				</Row>
				<Row ><span className={styles.infoheaders}>Released : </span>
					<p className={styles.info}>{animeData.date}</p>
				</Row>
				<Row ><span className={styles.infoheaders}>Status : </span>
					<p className={styles.info}>{animeData.status}</p>
				</Row>
				<Row ><span className={styles.infoheaders}>Other Name : </span>
					<p className={styles.info}>{animeData.other}</p>
				</Row>
				<Row ><span className={styles.infoheaders}>Episodes : </span>
					<p className={styles.info}>{animeData.episodes}</p>
				</Row>
			</Container>
		</Container>
	)
}

export default SideBar
