import React, { useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from '../containers/components.module.css';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore'


const SignUp = () => {
	const name = useRef();
	const email = useRef();
	const password = useRef();
	const confirmpassword = useRef();
	const [message, setMessage] = useState({ message: '', type: '' });

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password.current.value === confirmpassword.current.value) {
			createUserWithEmailAndPassword(auth, email.current.value, password.current.value).then(res => {
				sendEmailVerification(auth.currentUser, { url: 'http://localhost:3000/login' }).then(res1 => {
					setMessage({ message: "Verification Email has been sent", type: 'sent' });
					console.log('database init')
					const mydoc = doc(db, `users/${res.user.uid}`);
					setDoc(mydoc, { name: name.current.value, email: email.current.value, favs: [], seen: {} });
				})
			}).catch(err => {
				console.log(err);
				if (err.code === 'auth/email-already-in-use')
					setMessage({ message: 'Email already in Use', type: 'error' });
				else
					setMessage({ message: "Can't create a account right now", type: 'error' });
			})
		} else {
			setMessage({ message: "Password don't match", type: 'error' });
		}
	}
	return (
		<div className={styles.Login} >
			<Form onSubmit={handleSubmit}>
				<Form.Group size="lg" controlId="email">
					<Form.Label> <h5>Full Name</h5></Form.Label>
					<Form.Control
						autoFocus
						type="text"
						ref={name}
						placeholder="Rick"
					/>
				</Form.Group>
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
				</Form.Group>
				<Form.Group size="lg" controlId="password">
					<Form.Label><h5>Confirm Password</h5></Form.Label>
					<Form.Control
						type="password"
						ref={confirmpassword}
						placeholder="Re-enter Password"
					/>
				</Form.Group>
				{message ? <div className={message.type === 'error' ? styles.errormsg : styles.informsg}>{message.message}</div> : null}
				<div className={styles.submit + ' text-center'}>
					<Button block size="lg" type="submit">
						Sign Up
					</Button>
				</div>
				<Form.Text>
					Already have an account? <Link to={'/login'}>Log In</Link>
				</Form.Text>
			</Form>
		</div >
	)
}

export default SignUp
