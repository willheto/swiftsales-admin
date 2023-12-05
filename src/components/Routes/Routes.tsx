import Leads from '@src/views/Leads/Leads';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const RouteFile = () => {
	return (
		<Routes>
			<Route path="/leads" element={<Leads />} />
			<Route path="/account" element={<div>Account</div>} />
		</Routes>
	);
};

export default RouteFile;
