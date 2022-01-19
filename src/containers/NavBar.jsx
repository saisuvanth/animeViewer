import React from "react";
import { Container, Button, Navbar, Nav } from 'react-bootstrap';
import logo from '../assets/logo.png';
import styles from './components.module.css';
import { BsSearch } from 'react-icons/bs';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';

const NavBar = ({ setSearchKey, logged, setLogged }) => {
	const naviger = useNavigate();
	const logout = () => {
		setLogged(false);
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
					<span className={styles.sitename}>Anime Viewer</span>
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
					<Nav className={`me-auto my-2 my-lg-0`}>
						{logged ? <div className="text-center">
							<Link to={'/wishlist'}> <div className={styles.favourites}>Favourites</div></Link>
							<Button className={styles.account} onClick={logout}><FiLogOut />&nbsp;&nbsp;&nbsp;Logout</Button>
						</div>
							: <Link style={{ textDecoration: 'none', color: 'white' }} to={'/login'}><Button className={styles.login}><FiLogIn />&nbsp;&nbsp;&nbsp;Login</Button></Link>}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar >
	)
}

export default NavBar;