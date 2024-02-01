import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import RouteFile from '../Routes/Routes';
import MobileMenu from './MobileMenu';
import useMobile from '@src/hooks/useMobile';

const SwiftSalesAdmin = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState<boolean>(false);

	const isMobile = useMobile();

	return (
		<div className="d-flex flex-column w-100 h-100">
			<Header isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
			<MobileMenu isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
			<div
				className="d-flex"
				style={{
					height: 'calc(100% - 59px)',
				}}
			>
				<Sidebar />
				<RouteFile />
			</div>
		</div>
	);
};

export default SwiftSalesAdmin;
