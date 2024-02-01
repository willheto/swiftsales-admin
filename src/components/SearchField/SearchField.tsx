import styled from 'styled-components';
import React from 'react';

const SearchField = ({
	searchTerm,
	setSearchTerm,
}: {
	searchTerm: string;
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	return <StyledInput onChange={handleChange} placeholder="Search..." />;
};

const StyledInput = styled.input`
	width: 100%;
	padding: 0.5rem 0.5rem;
	border-radius: 0.5rem;
	border: 1px solid #ccc;
	font-size: 1rem;
	height: 28px;
	max-width: 250px;
`;

export default SearchField;
