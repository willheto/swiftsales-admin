import Leads from '@src/views/Leads/Leads';
import SalesAppointments from '@src/views/SalesAppointments/SalesAppointments';
import Settings from '@src/views/Settings/Settings';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const RouteFile = () => {
	return (
		<Routes>
			<Route path="/leads" element={<Leads />} />
			<Route path="/sales-appointments" element={<SalesAppointments />} />
			<Route path="/settings" element={<Settings />} />
		</Routes>
	);
};

export default RouteFile;
