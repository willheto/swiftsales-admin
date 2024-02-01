import useMobile from '@src/hooks/useMobile';
import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MobileMenu = ({
	isMobileMenuOpen,
	setIsMobileMenuOpen,
}: {
	isMobileMenuOpen: boolean;
	setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const location = useLocation();

	const isCurrentPath = (path: string) => {
		return location.pathname === path;
	};

	const navigate = useNavigate();

	useEffect(() => {
		if (location.pathname === '/') {
			navigate('/leads');
		}
	}, [location.pathname, navigate]);

	const isMobile = useMobile();

	useEffect(() => {
		if (!isMobile) {
			setIsMobileMenuOpen(false);
		}
	}, [isMobile, setIsMobileMenuOpen]);

	// if clicked outside of the menu, close the menu
	useEffect(() => {
		//if click is on id menu-icon, do nothing
		const menuIcon = document.getElementById('menu-icon');
		if (menuIcon) {
			menuIcon.addEventListener('click', () => {
				return;
			});
		}
		const handleClickOutside = (event: any) => {
			if (event.target.id !== 'menu-icon') {
				setIsMobileMenuOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [setIsMobileMenuOpen]);

	return (
		<MobileMenuContainer
			theme={{
				isMobileMenuOpen,
			}}
		>
			<StyledLink
				onClick={() => setIsMobileMenuOpen(false)}
				theme={{ isCurrentPath: isCurrentPath('/leads') }}
				to="/leads"
			>
				Leads
			</StyledLink>
			<StyledLink
				onClick={() => setIsMobileMenuOpen(false)}
				theme={{ isCurrentPath: isCurrentPath('/sales-appointments') }}
				to="/sales-appointments"
			>
				Sales Appointments
			</StyledLink>
			<StyledLink
				onClick={() => setIsMobileMenuOpen(false)}
				theme={{ isCurrentPath: isCurrentPath('/settings') }}
				to="/settings"
			>
				Settings
			</StyledLink>
		</MobileMenuContainer>
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

const MobileMenuContainer = styled.div`
	height: ${props => (props.theme.isMobileMenuOpen ? '110px' : '0px')};
	overflow: hidden;
	z-index: 1000;
	position: absolute;
	margin-top: 59px;
	display: flex;
	flex-direction: column;
	width: 100%;
	background-color: white;
	transition: all 0.3s ease 0s;
	box-shadow: rgba(0, 30, 43, 0.1) 0px 4px 4px 0px;
`;

export default MobileMenu;
