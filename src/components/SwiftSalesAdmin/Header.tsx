import { useUser } from '@src/context/UserContext';
import useMobile from '@src/hooks/useMobile';
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { GrSwift } from 'react-icons/gr';
import { IoMenuOutline } from 'react-icons/io5';
import styled from 'styled-components';

const Header = ({
	isMobileMenuOpen,
	setIsMobileMenuOpen,
}: {
	isMobileMenuOpen: boolean;
	setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const { user } = useUser();

	const handleLogout = () => {
		localStorage.removeItem('swiftsalesAuthToken');
		window.location.reload();
	};
	const isMobile = useMobile();

	const handleOpenMenu = () => {
		setIsMobileMenuOpen(prevState => !prevState);
	};

	return (
		<HeaderContainer>
			<div className="d-flex align-items-center gap-2">
				{isMobile && (
					<span
						id="menu-icon"
						onClick={handleOpenMenu}
						style={{
							cursor: 'pointer',
						}}
					>
						<IoMenuOutline id="menu-icon" size={25} />
					</span>
				)}
				<GrSwift size={25} fill="#102526" />
				<h5 className="mb-0">Swiftsales</h5>
			</div>
			<Dropdown>
				<Dropdown.Toggle>{user?.firstName}</Dropdown.Toggle>

				<Dropdown.Menu>
					<Dropdown.Item href="#" onClick={handleLogout}>
						Log out
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
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
