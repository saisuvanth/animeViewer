import React, { useState, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import NavBar from "./containers/NavBar";
import AnimeContainer from "./components/AnimeContainer";
import AnimeInfo from "./containers/AnimeInfo";
import Login from './components/Login';
import SignUp from './components/SignUp';
import { auth } from './firebase';

const App = () => {
	const [searchKey, setSearchKey] = useState('');
	const [logged, setLogged] = useState(false);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user && user.emailVerified) setLogged(true);
		});
	}, [])

	return (
		<div style={{ backgroundColor: 'black' }}>
			<NavBar setSearchKey={setSearchKey} logged={logged} setLogged={setLogged} />
			<Routes>
				<Route path={'/'} element={<AnimeContainer searchKey={searchKey} logged={logged} favs={false} />} />
				<Route path={'/login'} element={<Login setLogged={setLogged} />} />
				<Route path={'/register'} element={<SignUp />} />
				<Route path={'/wishlist'} element={<AnimeContainer searchKey={searchKey} logged={logged} favs={true} />} />
				<Route path={`/anime/:anid`} element={<AnimeInfo logged={logged} />} />
			</Routes>
		</div>
	);
}

export default App;