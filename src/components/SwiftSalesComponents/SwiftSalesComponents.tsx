import styled from 'styled-components';
import React from 'react';

const colorPalette = ['#896E38', '#102526', '#2F5D8C', '#A38881', ' #D8D8D6'];

export const SwiftSalesButton = ({ size, children }: { size: string; children: React.ReactNode }) => {
	return <BaseButton theme={{ size }}>{children}</BaseButton>;
};

const BaseButton = styled.button`
	font-size: ${props => (props.theme.size === 'small' ? '13px' : '16px')};
	height: ${props => (props.theme.size === 'small' ? '28px' : '40px')};
	width: ${props => (props.theme.size === 'small' ? '105px' : '120px')};
	background-color: #102526;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	transition: 0.2s ease-in-out;
	&:hover {
		background-color: rgb(16, 37, 38, 0.8);
	}
`;

export default SwiftSalesButton;
