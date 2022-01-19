import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from '../containers/components.module.css';
import { RiHeart3Line, RiHeart3Fill } from 'react-icons/ri';
import { auth, db } from '../firebase';
import { updateDoc, doc, arrayUnion, arrayRemove } from 'firebase/firestore';

export const MyCard = ({ anime, setWishlist, logged, renderer }) => {
	const [wish, setWish] = useState();

	useEffect(() => {
		setWish(anime.fav);
	}, [anime]);

	const wishListHandler = async (e) => {
		renderer(prev => !prev);
		const uid = auth.currentUser.uid;
		anime.fav = true;
		anime.seen = [];
		setWishlist(prev => [...prev, anime]);
		setWish(true);
		await updateDoc(doc(db, 'users', uid), { favs: arrayUnion(anime) });
	}

	const removeWishList = async (e) => {
		renderer(prev => !prev);
		const uid = auth.currentUser.uid;
		setWishlist(prev => {
			return prev.splice(prev.indexOf(anime), 1)
		})
		setWish(false);
		await updateDoc(doc(db, 'users', uid), { favs: arrayRemove(anime) });
	}

	return (
		<Card className={'shadow border-0 h-100 ' + styles.card}>
			<Card.Img variant="top" src={anime.img} />
			<Card.Body>
				<Link to={`/anime/${anime.url}`} style={{ textDecoration: 'none' }}>
					<Card.Title className={styles.card_title}>{anime.name}</Card.Title>
				</Link>
			</Card.Body>
			<Card.Footer className={'text-muted ' + styles.card_footer}>
				{anime.date}
				{!wish ?
					<button disabled={!logged} className={logged ? styles.favv : styles.favv_disabled} onClick={wishListHandler} >
						<RiHeart3Line />
					</button> :
					<button disabled={!logged} className={logged ? styles.favv : styles.favv_disabled} onClick={removeWishList} >
						<RiHeart3Fill style={{ color: 'red' }} />
					</button>
				}
			</Card.Footer>
		</Card >
	)
}

export default MyCard;
