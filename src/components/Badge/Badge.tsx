import styled from 'styled-components';
import React from 'react';

const Badge = ({ licenseType }: { licenseType: 'Basic' | 'Premium' | 'Pro' }) => {
	const licenseTypes = [
		{
			name: 'Basic',
			background: 'linear-gradient(to right, #ece9e6 0%, #ffffff 100%)',
			boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.2)',
			textColor: 'white',
			textShadow: '3px 3px 3px #000',
		},
		{
			name: 'Premium',
			background: 'linear-gradient(to right, #a67c00, #bf9b30, #ffcf40, #bf9b30, #a67c00)',
			boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.3)',
			textColor: 'white',
			textShadow: '1px 1px 2px #000',
		},
		{
			name: 'Pro',
			background: 'linear-gradient(to right, #E5E4E2 0%, #A7A6A6 50%, #E5E4E2 100%)',
			boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.2)',
			textColor: '#2c3e50',
			textShadow: '1px 1px 2px #fff',
		},
	];

	const licenseTypeObj = licenseTypes.find(type => type.name === licenseType);

	return (
		<BadgeContainer
			style={{
				background: licenseTypeObj?.background,
				boxShadow: licenseTypeObj?.boxShadow,
				color: licenseTypeObj?.textColor,
				textShadow: licenseTypeObj?.textShadow,
			}}
		>
			<b>{licenseType}</b>
		</BadgeContainer>
	);
};

const BadgeContainer = styled.span`
	background-size: 100% 100%;
	background-repeat: no-repeat;
	width: fit-content;
	padding: 0.25rem 1rem;
	border-radius: 0.25rem;
`;

export default Badge;
