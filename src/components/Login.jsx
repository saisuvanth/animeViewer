import React, { useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../containers/components.module.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Login = ({ setLogged }) => {
	const navigate = useNavigate();
	const email = useRef();
	const password = useRef();
	const [message, setMessage] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email.current.value, password.current.value).then(res => {
			if (res.user.emailVerified) {
				navigate('/', { replace: true });
				setLogged(true);
			} else {
				setMessage('Email is not verified');
			}
		}).catch(err => {
			if (err.code === 'auth/wrong-password') setMessage('Password/Email are incorrect');
		})
	}
	return (
		<div className={styles.Login} >
			<Form onSubmit={handleSubmit}>
				<Form.Group size="lg" controlId="email">
					<Form.Label> <h5>Email Address</h5></Form.Label>
					<Form.Control
						autoFocus
						type="email"
						ref={email}
						placeholder="example@gmail.com"
					/>
				</Form.Group>
				<Form.Group size="lg" controlId="password">
					<Form.Label><h5>Password</h5></Form.Label>
					<Form.Control
						type="password"
						ref={password}
						placeholder="Password"
					/>
					{message ? <div className={styles.errormsg}>{message}</div> : null}
				</Form.Group>
				<div className={styles.submit + ' text-center'}>
					<Button block size="lg" type="submit">
						Login
					</Button>
				</div>
				<Form.Text>
					Don't have an account? <Link to={'/register'}>Sign Up</Link>
				</Form.Text>
			</Form>
		</div >
	)
}

export default Login;
