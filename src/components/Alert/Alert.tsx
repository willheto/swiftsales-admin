import React from 'react';
import styled from 'styled-components';

const Alert = ({ type, message }: { type: AlertType; message: string }) => {
	return <AlertContainer theme={{ type: type }}>{message}</AlertContainer>;
};

const AlertContainer = styled.div`
	text-align: center;
	background-color: ${props => {
		switch (props.theme.type) {
			case 'success':
				return '#d4edda';
			case 'danger':
				return '#f8d7da';
			case 'warning':
				return '#fff3cd';
			case 'info':
				return '#d1ecf1';
			default:
				return '#d4edda';
		}
	}};
	color: ${props => {
		switch (props.theme.type) {
			case 'success':
				return '#155724';
			case 'danger':
				return '#721c24';
			case 'warning':
				return '#856404';
			case 'info':
				return '#0c5460';
			default:
				return '#155724';
		}
	}};
	padding: 1rem;
	border: 1px solid transparent;
	border-radius: 0.25rem;
`;

export default Alert;
