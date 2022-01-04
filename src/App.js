import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import NavBar from "./containers/NavBar";
import AnimeContainer from "./components/AnimeContainer";
import AnimeInfo from "./containers/AnimeInfo";
import Login from './components/Login';

const App = () => {
	const [searchKey, setSearchKey] = useState('');

	return (
		<div style={{ backgroundColor: 'black' }}>
			<NavBar setSearchKey={setSearchKey} />
			<Routes>
				<Route path={'/'} element={<AnimeContainer searchKey={searchKey} />} />
				<Route path={'/login'} element={<Login />} />
				<Route path={`/anime/:anid`} element={<AnimeInfo />} />
			</Routes>
		</div>
	);
}

export default App;