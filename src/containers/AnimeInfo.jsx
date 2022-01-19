import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import SideBar from '../components/SideBar';
import InfinteScroll from '../components/InfinteScroll';


function AnimeInfo({ logged }) {
	const { anid } = useParams();
	const [animeName, setAnimeName] = useState('');

	return (
		<Container fluid>
			<Row>
				<Col xs='12' md='12' lg='6'><SideBar url={anid} name={setAnimeName} /></Col>
				<Col xs='12' md='12' lg='6' style={{ color: 'white', height: '100%', overflow: 'auto' }}>
					<InfinteScroll url={anid} name={animeName} logged={logged} />
				</Col>
			</Row>
		</Container>
	)
}

export default AnimeInfo
