import React from 'react';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';
import { GrSwift } from 'react-icons/gr';
import { SwiftSalesButton } from '../SwiftSalesComponents/SwiftSalesComponents';
import { login } from '@src/api/services/authService';
import { useUser } from '@src/context/UserContext';

const Login = ({ isAuthenticating }: { isAuthenticating: boolean }) => {
	const { setUser, user } = useUser();
	const [loginData, setLoginData] = React.useState({
		email: '',
		password: '',
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await login(loginData);

			if (response.token && response.user) {
				localStorage.setItem('swiftsalesAuthToken', response.token);

				setUser(response.user);
			}
		} catch (e) {
			console.log(e);
		}
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoginData({ ...loginData, email: e.target.value });
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoginData({ ...loginData, password: e.target.value });
	};
	return (
		<LoginContainer onSubmit={handleSubmit}>
			<div className="d-flex align-items-center gap-3 mb-4">
				<GrSwift size={30} />
				<h2 className="mb-0">Swiftsales Admin</h2>
			</div>
			<h3>Login in to your account</h3>
			<Form.Group style={{ width: '300px' }}>
				<Form.Label>Email</Form.Label>
				<Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} />
			</Form.Group>
			<Form.Group style={{ width: '300px' }}>
				<Form.Label>Password</Form.Label>
				<Form.Control type="password" onChange={handlePasswordChange} />
			</Form.Group>
			{isAuthenticating ? <div>Loading...</div> : <SwiftSalesButton size="big">Login</SwiftSalesButton>}
		</LoginContainer>
	);
};

const LoginContainer = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 420px;
	padding-left: 60px;
	padding-top: 60px;
	height: 100%;
	background-color: #fff;
`;

export default Login;
