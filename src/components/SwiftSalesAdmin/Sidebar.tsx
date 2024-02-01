import useMobile from '@src/hooks/useMobile';
import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Sidebar = () => {
	const location = useLocation();
	const isMobile = useMobile(); // Use the hook

	const isCurrentPath = (path: string) => {
		return location.pathname === path;
	};

	const navigate = useNavigate();

	useEffect(() => {
		if (location.pathname === '/') {
			navigate('/leads');
		}
	}, [location.pathname, navigate]);

	return (
		<SidebarContainer theme={{ isMobile }} id="sidebar">
			<StyledLink theme={{ isCurrentPath: isCurrentPath('/leads') }} to="/leads">
				Leads
			</StyledLink>
			<StyledLink theme={{ isCurrentPath: isCurrentPath('/sales-appointments') }} to="/sales-appointments">
				Sales Appointments
			</StyledLink>
			<StyledLink theme={{ isCurrentPath: isCurrentPath('/settings') }} to="/settings">
				Settings
			</StyledLink>
		</SidebarContainer>
	);
};

const StyledLink = styled(Link)`
	margin: 0px;
	appearance: none;
	border: medium;
	cursor: pointer;
	position: relative;
	width: 100%;
	min-height: 32px;
	padding: 6px 16px;
	box-sizing: border-box;
	display: flex;
	-moz-box-align: center;
	align-items: center;
	font-family: 'Euclid Circular A', 'Helvetica Neue', Helvetica, Arial, sans-serif;
	font-weight: normal;
	text-align: left;
	text-decoration: none;
	text-transform: capitalize;
	transition: background-color 100ms ease-in-out 0s;
	color: rgb(0, 30, 43);
	font-size: 13px;
	line-height: 20px;

	background-color: ${props => (props.theme.isCurrentPath ? 'rgb(232, 237, 235)' : 'transparent')};

	&:hover {
		background-color: rgb(232, 237, 235);
	}
`;

const SidebarContainer = styled.div`
	padding-top: 1rem;
	display: flex;
	flex-direction: column;
	width: 200px;
	min-width: 200px;
	max-width: 200px;
	background-color: #fbfbfb;
	transition: all 0.3s ease 0s;
	${props => props.theme.isMobile && 'width: 0px !important;'}
	${props => props.theme.isMobile && 'min-width: 0px !important;'}
`;

export default Sidebar;
