import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import RouteFile from '../Routes/Routes';
import styled from 'styled-components';
import { GrSwift } from 'react-icons/gr';

const SwiftSalesAdmin = () => {
	return (
		<div className="d-flex flex-column w-100 h-100">
			<Header />
			<div
				className="d-flex"
				style={{
					height: 'calc(100% - 58px)',
				}}
			>
				<Sidebar />
				<RouteFile />
			</div>
		</div>
	);
};

export default SwiftSalesAdmin;
