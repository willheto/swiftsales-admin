import { useUser } from '@src/context/UserContext';
import React from 'react';
import { GrSwift } from 'react-icons/gr';
import styled from 'styled-components';

const Header = () => {
	const { user } = useUser();
	return (
		<HeaderContainer>
			<div className="d-flex align-items-center gap-2">
				<GrSwift size={25} fill="#102526" />
				<h5 className="mb-0">Swiftsales Admin</h5>
			</div>
			<div>{user?.firstName}</div>
		</HeaderContainer>
	);
};

const HeaderContainer = styled.div`
	z-index: 1000;
	box-shadow: rgba(0, 30, 43, 0.1) 0px 4px 4px 0px;
	display: flex;
	align-items: center;
	width: 100%;
	padding: 1rem;
	justify-content: space-between;
	background-color: white;
	border-bottom: 1px solid #d3d3d3;
`;

export default Header;
