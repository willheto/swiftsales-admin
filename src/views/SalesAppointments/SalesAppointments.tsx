import React from 'react';
import Table from '../../components/Table/Table';
import { Card, Modal } from 'react-bootstrap';
import Content from '@src/components/SwiftSalesAdmin/Content';
import SwiftSalesButton from '@src/components/SwiftSalesComponents/SwiftSalesComponents';
import api from '@src/api';
import { useUser } from '@src/context/UserContext';
import styled from 'styled-components';
import SalesAppointmentForm from './SalesAppointmentForm';

const SalesAppointments = () => {
	const { user } = useUser();
	const [salesAppointments, setSalesAppointments] = React.useState<SalesAppointmentInterface[]>();

	const fetchSalesAppointments = async () => {
		try {
			if (!user) return;
			const response = await api.salesAppointments.getAllByUserID(user.userID);

			console.log(response);
			setSalesAppointments(response);
		} catch (e) {
			console.log(e);
		}
	};
	React.useEffect(() => {
		fetchSalesAppointments();
	}, []);

	const columns = [
		{
			name: 'leadID',
			label: 'Lead ID',
		},
		{
			name: 'notes',
			label: 'Notes',
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

	const [editingSalesAppointment, setEditingSalesAppointment] = React.useState<SalesAppointmentInterface | null>();
	const handleAddEdit = (salesAppointment?: SalesAppointmentInterface) => {
		setEditingSalesAppointment(salesAppointment);
	};

	const refetch = async () => {
		await fetchSalesAppointments();
	};

	return (
		<>
			<SalesAppointmentFormModal
				centered
				size="lg"
				show={editingSalesAppointment !== undefined}
				onHide={() => setEditingSalesAppointment(undefined)}
			>
				<SalesAppointmentForm
					salesAppointment={editingSalesAppointment}
					onClose={() => setEditingSalesAppointment(undefined)}
					successCallback={() => {
						refetch();
						setEditingSalesAppointment(undefined);
					}}
				/>
			</SalesAppointmentFormModal>
			<Content>
				<h5>Sales Appointments</h5>

				<Card className="p-3 overflow-auto h-100">
					<Card.Header className="p-0 pb-3">
						<SwiftSalesButton
							variant="primary"
							size="small"
							onClick={() => setEditingSalesAppointment(null)}
						>
							Create new
						</SwiftSalesButton>
					</Card.Header>
					<div className="overflow-auto h-100">
						<Table resource={salesAppointments} columns={columns} handleAddEdit={handleAddEdit} />
					</div>
				</Card>
			</Content>
		</>
	);
};

const SalesAppointmentFormModal = styled(Modal)``;
export default SalesAppointments;
