import React from 'react';
import { StyledTable as Table } from '../../components/Table/Table';
import { Card } from 'react-bootstrap';
import Content from '@src/components/SwiftSalesAdmin/Content';
import SwiftSalesButton from '@src/components/SwiftSalesComponents/SwiftSalesComponents';
import api from '@src/api';
import { useUser } from '@src/context/UserContext';

const Leads = () => {
	const { user } = useUser();
	const [leads, setLeads] = React.useState<LeadInterface[]>();

	const fetchLeads = async () => {
		try {
			if (!user) return;
			const response = await api.leads.getAllByUserID(user.userID);

			setLeads(response);
		} catch (e) {
			console.log(e);
		}
	};
	React.useEffect(() => {
		fetchLeads();
	}, []);

	const columns = [
		{
			name: 'businessID',
			label: 'Business ID',
		},
		{
			name: 'companyName',
			label: 'Company Name',
		},
		{
			name: 'contactPerson',
			label: 'Contact Person',
		},
		{
			name: 'contactPhone',
			label: 'Contact Phone',
		},
		{
			name: 'contactEmail',
			label: 'Contact Email',
		},
		{
			name: 'header',
			label: 'Header',
		},
		{
			name: 'created_at',
			label: 'Created At',
		},
		{
			name: 'updated_at',
			label: 'Updated At',
		},
	];

	const handleAddEdit = () => {
		console.log('add edit');
	};
	return (
		<Content>
			<h5>Leads</h5>

			<Card className="p-3 overflow-auto">
				<Card.Header className="p-0 pb-3">
					<SwiftSalesButton size="small">Create new</SwiftSalesButton>
				</Card.Header>
				<div className="overflow-auto">
					<Table>
						<thead>
							<tr>
								{columns.map(column => (
									<th key={column.name}>{column.label}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{leads?.map(lead => (
								<tr key={lead.leadID} onClick={handleAddEdit}>
									{columns.map(column => (
										<td key={column.name}>{lead[column.name]}</td>
									))}
								</tr>
							))}
						</tbody>
					</Table>
				</div>
			</Card>
		</Content>
	);
};

export default Leads;
