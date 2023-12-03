import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Routes, Route } from 'react-router-dom';

const SwiftSalesAdmin = () => {
	return (
		<div className="d-flex flex-column w-100 h-100">
			<Header />
			<div className="d-flex h-100">
				<Sidebar />
				<Routes>
					<Route path="/" element={<div>overview</div>} />
					<Route path="/account" element={<div>account</div>} />
				</Routes>
			</div>
		</div>
	);
};

export default SwiftSalesAdmin;
