import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Sidebar = () => {
	return (
		<SidebarContainer>
			<Link to="/">overview</Link>
			<Link to="/account">account</Link>
		</SidebarContainer>
	);
};

const SidebarContainer = styled.div`
	padding: 1rem;
	display: flex;
	flex-direction: column;
	width: 200px;
	background-color: white;
	border-right: 1px solid #d3d3d3;
`;

export default Sidebar;
