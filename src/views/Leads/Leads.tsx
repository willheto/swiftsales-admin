import React, { useCallback } from 'react';
import Table from '../../components/Table/Table';
import { Card, Modal } from 'react-bootstrap';
import Content from '@src/components/SwiftSalesAdmin/Content';
import SwiftSalesButton from '@src/components/SwiftSalesComponents/SwiftSalesComponents';
import api from '@src/api';
import { useUser } from '@src/context/UserContext';
import styled from 'styled-components';
import LeadForm from './LeadForm';
import LeadExport from './LeadExport';
import useSearch from '@src/hooks/useSearch';

const Leads = () => {
	const { user } = useUser();
	const [leads, setLeads] = React.useState<LeadInterface[]>();

	const fetchLeads = useCallback(async () => {
		try {
			if (!user) return;
			const response = await api.leads.getAllByUserID(user.userID);

			setLeads(response);
		} catch (e) {
			console.log(e);
		}
	}, [user]);

	React.useEffect(() => {
		fetchLeads();
	}, [fetchLeads]);

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
	const [isImporting, setIsImporting] = React.useState<boolean>(false);

	const handleAddEdit = (lead?: LeadInterface) => {
		setEditingLead(lead);
	};

	const refetch = async () => {
		await fetchLeads();
	};

	const { renderSearchField, filteredResources } = useSearch(leads || [], {
		searchColumns: ['companyName', 'contactPerson', 'contactPhone', 'contactEmail', 'header'],
	});

	return (
		<>
			<LeadExportModal centered size="lg" show={isImporting} onHide={() => setIsImporting(false)}>
				<LeadExport
					onClose={() => setIsImporting(false)}
					successCallback={() => {
						refetch();
						setIsImporting(false);
					}}
				/>
			</LeadExportModal>
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
				<Card className="p-3 overflow-auto">
					<Card.Header className="p-0 pb-3 d-flex justify-content-between align-items-center flex-wrap gap-2">
						<div className="d-flex gap-2 justify-content-between flex-fill flex-wrap">
							<h5 className="mb-0">Leads</h5>
							{renderSearchField()}
						</div>
						<div className="d-flex gap-2 justify-content-end">
							<SwiftSalesButton variant="primary" size="small" onClick={() => setIsImporting(true)}>
								Import
							</SwiftSalesButton>
							<SwiftSalesButton variant="primary" size="small" onClick={() => setEditingLead(null)}>
								Create new
							</SwiftSalesButton>
						</div>
					</Card.Header>
					<div className="overflow-auto h-100">
						<Table resource={filteredResources} columns={columns} handleAddEdit={handleAddEdit} />
					</div>
				</Card>
			</Content>
		</>
	);
};

const LeadExportModal = styled(Modal)``;
const LeadFormModal = styled(Modal)``;
export default Leads;
