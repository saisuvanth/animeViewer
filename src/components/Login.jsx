import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import styles from '../containers/components.module.css';

const Login = () => {

	return (
		<div className='d-flex justify-content-center' style={{ width: '100%', height: '100vh' }}>
			<Form className={styles.loginpage} style={{ color: 'white', padding: '50px', paddingTop: '90px' }}>
				<Form.Group as={Row} className='mb-3' controlId="formBasicEmail">
					<Form.Label column sm={2}>Email address</Form.Label>
					<Col sm={10}>
						<Form.Control type="email" placeholder="Enter email" />
					</Col>
				</Form.Group>
				<Form.Group as={Row} className='mb-3' controlId="formBasicPassword">
					<Form.Label column sm={2}>Password</Form.Label>
					<Col sm={10}>
						<Form.Control type="password" placeholder="Password" />
					</Col>
					<Form.Text id="passwordHelpBlock" muted>
						Your password must be 8-20 characters long, contain letters and numbers, and
						must not contain spaces, special characters, or emoji.
					</Form.Text>
				</Form.Group>

			</Form>
		</div>
	)
}

export default Login;
