import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Container, ListGroup, Row, Image, Button } from 'react-bootstrap';
import { episodeNumber, episodes, getEpisodeVideo } from '../scraper';
import styles from '../containers/components.module.css';
import loader from '../assets/loading1.svg';
import { VscChromeClose } from 'react-icons/vsc'
import { auth, db } from '../firebase';
import { updateDoc, getDoc, doc } from 'firebase/firestore';

const InfinteScroll = ({ url, name, logged }) => {
	const [total, setTotal] = useState(0);
	const [video, setVideo] = useState(false);
	const [epiStorage, setEpiStorage] = useState([]);
	const [seenVideo, setSeenVideo] = useState({ num: null, event: null });

	useEffect(() => {
		if (logged) {
			const uid = auth.currentUser.uid;
			getDoc(doc(db, 'users', uid)).then(docInfo => {
				const d = docInfo.data();
				console.log(d);
				setEpiStorage(d.seen[url].map(Number));
			});
		} else
			setEpiStorage(window.localStorage.hasOwnProperty(url) ? window.localStorage.getItem(url).split(',').map(Number) : null);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url, logged]);

	useEffect(() => {
		episodeNumber(url).then(res => {
			setTotal(res);
			console.log(res);
		})
	}, [url]);
	const [pageNumber, setPageNumber] = useState(1);

	useEffect(() => {
		setPageNumber(1);
	}, [url])

	const observer = useRef();

	const { episodeData, loading, error, hasMore } = ScrollList(url, pageNumber, total);


	const lastAnimeElementRef = useCallback(node => {
		if (observer.current) observer.current.disconnect();
		observer.current = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting && !hasMore) {
				setPageNumber(prevPageNumber => prevPageNumber + 1);
			}
		});
		if (node) observer.current.observe(node);
	}, [hasMore]);

	const handler = async (event, e) => {
		const episodenum = event.currentTarget.getElementsByTagName('span')[2].innerHTML;
		setSeenVideo({ num: episodenum, event: event.currentTarget });
		const vUrl = await getEpisodeVideo(e);
		setVideo(vUrl);
	}

	const closeHandler = async () => {
		setVideo(false);
		let data = window.localStorage.hasOwnProperty(url) ? window.localStorage.getItem(url) : '';
		data = data ? data.split(',') : [];
		data.includes(seenVideo.num) ? data.at(0) : data.push(seenVideo.num);
		window.localStorage[url] = data.join(',');
		seenVideo.event.className += ` ${styles.seen}`;
		if (logged) {
			const uid = auth.currentUser.uid;
			const { seen } = await (await getDoc(doc(db, 'users', uid))).data();
			if (!seen.hasOwnProperty(url)) seen[url] = [];
			seen[url].push(seenVideo.num);
			await updateDoc(doc(db, 'users', uid), { seen: seen });
		}
	}

	return (
		<Container>
			{video &&
				<div tabIndex={-1} className={styles.playerbox}>
					<div className={styles.videocontainer}>
						<div style={{ textAlign: 'right', paddingRight: '.4rem', height: '0px' }}>
							<Button variant='dark' className={styles.close} onClick={closeHandler}>
								<VscChromeClose />
							</Button>
						</div>
						<div style={{ padding: '10px' }}>
							<div className={styles.videoplayer}>
								<iframe src={video} frameBorder="0" title={video} allowFullScreen={true} className={styles.video}></iframe>
							</div>
						</div>
					</div>
				</div>
			}
			<ListGroup>
				{episodeData.map((anime, index) =>
					<ListGroup.Item key={anime.episodeUrl} ref={episodeData.length - 10 === (index + 1) ? lastAnimeElementRef : null} className={styles.episodelist}>
						<Container fluid className={epiStorage?.includes(index + 1) ? styles.seen : ''} onClick={(e) => handler(e, anime.episodeUrl)}>
							<Row><span className={styles.animename}>{name}</span></Row>
							<Row>
								<div style={{ display: 'inline' }}>
									<span className={styles.animeepisode}>Episode :</span><span className={styles.episodenum}>{anime.episode}</span>
								</div>
							</Row>
						</Container>
					</ListGroup.Item>
				)}
				{loading && <ListGroup.Item className={styles.loader}><Image src={loader} alt='Loading ...' /></ListGroup.Item>}
				{error && <ListGroup.Item>Error</ListGroup.Item>}
			</ListGroup>
		</Container>
	)
}

const ScrollList = (anid, pageNumber, total) => {
	const [episodeData, setEpisodeData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [hasMore, setHasMore] = useState(true);

	useEffect(() => {
		setEpisodeData([]);
	}, [anid])

	useEffect(() => {
		setLoading(true);
		setError(false);
		episodes(anid, total, pageNumber).then(res => {
			setEpisodeData(prevData => {
				return [...prevData, ...res.result]
			});
			setHasMore(res.start + 20 < res.total);
			setLoading(false);
		}).catch(err => {
			setError(true);
			console.log(err);
		});
	}, [anid, pageNumber, total]);

	return { episodeData, loading, error, hasMore };
}

export default InfinteScroll;

