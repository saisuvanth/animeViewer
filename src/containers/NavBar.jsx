import React, { useState } from "react";
import { Container, Button, Navbar, Nav } from 'react-bootstrap';
import logo from '../assets/logo.png';
import styles from './components.module.css';
import { BsSearch } from 'react-icons/bs';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';

const NavBar = ({ setSearchKey }) => {
	// eslint-disable-next-line no-unused-vars
	let [loggedFlag, setLoggedFlag] = useState(localStorage.getItem('logged') !== undefined ? localStorage.getItem('logged') : true);
	const naviger = useNavigate();
	const login = () => {
	}
	const logout = () => {
		loggedFlag = false;
	}
	const handleEvent = () => {
		naviger('/', { replace: true });
		const text = document.getElementById('searchbox').value;
		setSearchKey(text);
	}

	const keyHandler = (e) => {
		if (e.key === 'Enter') handleEvent();
	}
	return (
		<Navbar sticky="top" expand="lg" variant="dark" style={{ padding: 10, backgroundColor: '#191919', color: 'white' }}>
			<Container fluid='md'>
				<Navbar.Brand >
					<img className={styles.log} src={logo} alt="" width={50} height={40} />{' '}
					<span /*style={{ margin: 15, fontFamily: 'cursive', fontSize: 20, color: 'white' }}*/ className={styles.sitename}>Anime Viewer</span>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" color="white" />
				<Navbar.Collapse  >
					<Nav className="me-auto my-2 my-lg-0">
						<div style={{ display: "flex", flexDirection: "row" }}>
							<input type="search" name="search" id="searchbox" className={styles.form} onKeyPress={keyHandler} />
							<Button className={styles.search} onClick={handleEvent}>
								<BsSearch style={{ display: 'inline' }} />
							</Button>
						</div>
					</Nav>
					{loggedFlag ? <Link to={'/wishlist'}>Favourites</Link> : null}
					<Nav className={`me-auto`}>
						{loggedFlag ? <Button className={styles.account} onClick={logout}><FiLogOut />&nbsp;&nbsp;&nbsp;Logout</Button>
							: <Button className={styles.login} onClick={login}><FiLogIn />&nbsp;&nbsp;&nbsp;Login</Button>}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar >
	)
}

export default NavBar;