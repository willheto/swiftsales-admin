import styled from 'styled-components';

const colorPalette = ['#896E38', '#102526', '#2F5D8C', '#A38881', ' #D8D8D6'];

export const SwiftSalesButton = styled.button`
	background-color: #102526;
	color: white;
	border: none;
	padding: 0.5rem 1rem;
	border-radius: 5px;
	cursor: pointer;
	transition: 0.2s ease-in-out;
	&:hover {
		background-color: rgb(16, 37, 38, 0.8);
	}
`;
