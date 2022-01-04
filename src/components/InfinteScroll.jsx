import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Container, ListGroup, Row, Image, Button } from 'react-bootstrap';
import { episodeNumber, episodes } from '../scraper';
import styles from '../containers/components.module.css';
import loader from '../assets/loading1.svg';
import { VscChromeClose } from 'react-icons/vsc'

const InfinteScroll = ({ url, name }) => {
	const [total, setTotal] = useState(0);
	const [video, setVideo] = useState(false);
	// const iframeEditor = useRef(null);

	useEffect(() => {
		episodeNumber(url).then(res => {
			setTotal(res);
		});
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

	const handler = (event, e) => {
		setVideo(e);
		event.currentTarget.className += ` ${styles.seen}`;
	}

	const closeHandler = () => {
		setVideo(false);
	}

	// const loadchanger = () => {
	// 	const wind = iframeEditor.current.contentWindow.document.querySelector('jw-icon jw-icon-inline jw-button-color jw-reset jw-icon-fullscreen');
	// 	console.log(wind);
	// 	wind.click();
	// }
	const alertgiver = () => {
		alert('Enter full screen mode for better experience');
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
								<iframe src={video} frameBorder="0" title={video} onLoad={alertgiver} className={styles.video}></iframe>
							</div>
						</div>
					</div>
				</div>
			}
			<ListGroup>
				{episodeData.map((anime, index) => {
					if ((episodeData.length - 10) === (index + 1)) {
						return (
							<ListGroup.Item key={anime.url} ref={lastAnimeElementRef} className={styles.episodelist}>
								<Container fluid onClick={(e) => handler(e, anime.url)}>
									<Row><span className={styles.animename}>{name}</span></Row>
									<Row>
										<div style={{ display: 'inline' }}>
											<span className={styles.animeepisode}>Episode :</span><span className={styles.episodenum}>{anime.episode}</span>
										</div>
									</Row>
								</Container>
							</ListGroup.Item>)
					} else {
						return (<ListGroup.Item key={anime.url} className={styles.episodelist}>
							<Container fluid onClick={(e) => handler(e, anime.url)}>
								<Row><span className={styles.animename}>{name}</span></Row>
								<Row>
									<div style={{ display: 'inline' }}>
										<span className={styles.animeepisode}>Episode :</span><span className={styles.episodenum}>{anime.episode}</span>
									</div>
								</Row>
							</Container>
						</ListGroup.Item>)
					}
				})}
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

