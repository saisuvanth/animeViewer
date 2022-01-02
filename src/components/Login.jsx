import React from "react";

import background from '../assets/login.png';
import logo from '../assets/logo.png';

export const Login = () => {
	return (
		<div style={{ border: '5px solid black', height: '100vh', width: '100vh' }}>
			<img style={{ width: 'inherit', height: '100vh' }} src={background} alt="" />
			<div style={{ backgroundColor: 'black' }}>

			</div>
		</div>
	)
}

export default Login;