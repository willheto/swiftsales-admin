import React from 'react';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';
import { GrSwift } from 'react-icons/gr';
import { SwiftSalesButton } from '../SwiftSalesComponents/SwiftSalesComponents';
import { login } from '@src/api/services/authService';
import { useUser } from '@src/context/UserContext';
import useMobile from '@src/hooks/useMobile';

const Login = ({
	isAuthenticating,
	setIsAuthenticating,
}: {
	isAuthenticating: boolean;
	setIsAuthenticating: (isAuthenticating: boolean) => void;
}): JSX.Element => {
	const { setUser, user } = useUser();
	const [loginError, setLoginError] = React.useState<string | null>(null);
	const [loginData, setLoginData] = React.useState<{
		email: string;
		password: string;
	}>({
		email: '',
		password: '',
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		e.stopPropagation();
		try {
			setIsAuthenticating(true);
			const response = await login(loginData);

			if (response.token && response.user) {
				localStorage.setItem('swiftsalesAuthToken', response.token);
				setUser(response.user);
			}
		} catch (exception: any) {
			setLoginError(exception.error);
		} finally {
			setIsAuthenticating(false);
		}
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setLoginData({ ...loginData, email: e.target.value });
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setLoginData({ ...loginData, password: e.target.value });
	};

	const isMobile = useMobile();

	if (isMobile) {
		return (
			<MobileLogin onSubmit={handleSubmit}>
				<div>
					<div className="d-flex align-items-center gap-3 mb-4">
						<GrSwift size={30} />
						<h2 className="mb-0">Swiftsales Admin</h2>
					</div>
					<div className="d-flex flex-column mt-4 gap-2">
						<h3>Login in to your account</h3>
						<Form.Group style={{ width: '300px' }}>
							<Form.Label>Email</Form.Label>
							<Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} />
						</Form.Group>
						<Form.Group style={{ width: '300px' }}>
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" onChange={handlePasswordChange} />
						</Form.Group>
						{loginError && <div className="text-danger">{loginError}</div>}

						{isAuthenticating ? (
							<SwiftSalesButton variant="primary" size="big" type="submit" disabled>
								Logging in...
							</SwiftSalesButton>
						) : (
							<SwiftSalesButton variant="primary" size="big" type="submit">
								Login
							</SwiftSalesButton>
						)}
					</div>
				</div>
			</MobileLogin>
		);
	}

	return (
		<LoginContainer onSubmit={handleSubmit}>
			<div className="d-flex align-items-center gap-3 mb-4">
				<GrSwift size={30} />
				<h2 className="mb-0">Swiftsales Admin</h2>
			</div>
			<div className="d-flex flex-column mt-4 gap-2">
				<h3>Login in to your account</h3>
				<Form.Group style={{ width: '300px' }}>
					<Form.Label>Email</Form.Label>
					<Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} />
				</Form.Group>
				<Form.Group style={{ width: '300px' }}>
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" onChange={handlePasswordChange} />
				</Form.Group>
				{loginError && <div className="text-danger">{loginError}</div>}

				{isAuthenticating ? (
					<SwiftSalesButton variant="primary" size="big" type="submit" disabled>
						Logging in...
					</SwiftSalesButton>
				) : (
					<SwiftSalesButton variant="primary" size="big" type="submit">
						Login
					</SwiftSalesButton>
				)}
			</div>
		</LoginContainer>
	);
};

const MobileLogin = styled.form`
	background-color: #fff;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
	width: 100%;
	padding: 60px 0;
`;

const LoginContainer = styled.form`
	display: flex;
	flex-direction: column;
	width: 420px;
	padding-left: 60px;
	padding-top: 60px;
	height: 100%;
	background-color: #fff;
`;

export default Login;
