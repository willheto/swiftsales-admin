import React from 'react';
import { StyledTable as Table } from '../../components/Table/Table';
import { Card, Modal } from 'react-bootstrap';
import Content from '@src/components/SwiftSalesAdmin/Content';
import SwiftSalesButton from '@src/components/SwiftSalesComponents/SwiftSalesComponents';
import api from '@src/api';
import { useUser } from '@src/context/UserContext';
import styled from 'styled-components';
import LeadForm from './LeadForm';

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

	const [editingLead, setEditingLead] = React.useState<LeadInterface | null>();
	const handleAddEdit = (lead?: LeadInterface) => {
		setEditingLead(lead);
	};

	const refetch = async () => {
		await fetchLeads();
	};

	return (
		<>
			<LeadFormModal centered size="lg" show={editingLead !== undefined} onHide={() => setEditingLead(undefined)}>
				<LeadForm
					lead={editingLead}
					onClose={() => setEditingLead(undefined)}
					successCallback={() => {
						refetch();
						setEditingLead(undefined);
					}}
				/>
			</LeadFormModal>
			<Content>
				<h5>Leads</h5>

				<Card className="p-3 overflow-auto">
					<Card.Header className="p-0 pb-3">
						<SwiftSalesButton variant="primary" size="small" onClick={() => setEditingLead(null)}>
							Create new
						</SwiftSalesButton>
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
								{leads
									?.sort(
										(a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
									)
									.map(lead => (
										<tr key={lead.leadID} onClick={() => handleAddEdit(lead)}>
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
		</>
	);
};

const LeadFormModal = styled(Modal)``;
export default Leads;
