import React from 'react';
import { Card } from 'react-bootstrap';
import styles from '../containers/components.module.css';


export const MyCard = ({ anime }) => {
	return (
		<Card className={'shadow border-0 h-100 ' + styles.card}>
			<Card.Img variant="top" src={anime.img} />
			<Card.Body>
				<Card.Title className={styles.card_title}>{anime.name}</Card.Title>
			</Card.Body>
			<Card.Footer className={'text-muted ' + styles.card_footer}>{anime.date}</Card.Footer>
		</Card >
	)
}

export default MyCard;
