import React, { useEffect } from 'react';
import Login from '../Login/Login';
import styled from 'styled-components';
import { useUser } from '@src/context/UserContext';
import SwiftSalesAdmin from '../SwiftSalesAdmin/SwiftSalesAdmin';
import { authenticate } from '@src/api/services/authService';

const Root = () => {
	const { user, setUser } = useUser();

	const tryToAuthenticate = async () => {
		const token = localStorage.getItem('swiftsalesAuthToken');
		if (!token) return;
		const response = await authenticate({ token: token });

		if (response.user) {
			setUser(response.user);
		}
	};

	useEffect(() => {
		if (!user) {
			tryToAuthenticate();
		}
	}, []);

	return (
		<AuthenticationContainer>
			{!user ? (
				<>
					<Login />
					<SalesTextContainer>
						<h3 style={{ color: 'white' }}>Revolutionize your B2B sales game with our streamlined app.</h3>
						Join now to simplify your sales process and boost your success.
					</SalesTextContainer>
				</>
			) : (
				<SwiftSalesAdmin />
			)}
		</AuthenticationContainer>
	);
};

const AuthenticationContainer = styled.div`
	display: flex;
	height: 100%;
	background-color: #102526;
	width: 100%;
`;

const SalesTextContainer = styled.div`
	color: white;
	width: 50%;
	padding-top: 60px;
	padding-left: 60px;
`;

export default Root;
