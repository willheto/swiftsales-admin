import React from 'react';
import Table from '../../components/Table/Table';
import { Card, Modal } from 'react-bootstrap';
import Content from '@src/components/SwiftSalesAdmin/Content';
import SwiftSalesButton from '@src/components/SwiftSalesComponents/SwiftSalesComponents';
import api from '@src/api';
import { useUser } from '@src/context/UserContext';
import styled from 'styled-components';
import SalesAppointmentForm from './SalesAppointmentForm';
import { IoCopyOutline } from 'react-icons/io5';

const SalesAppointments = () => {
	const { user } = useUser();
	const [salesAppointments, setSalesAppointments] = React.useState<SalesAppointmentInterface[]>();
	const [copiedStatus, setCopiedStatus] = React.useState<{ [key: number]: boolean }>({});
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

	const MeetingUrlCopyButton = styled.button`
		display: flex;

		align-items: center;
		gap: 5px;
		white-space: nowrap;
		background: transparent;
		border: 1px solid #ccc;
		padding: 5px 10px;
		border-radius: 5px;
		cursor: pointer;

		&:hover {
			background: #ccc;
		}
	`;

	const handleCopyMeetingUrl = async (e, salesAppointment: SalesAppointmentInterface) => {
		e.stopPropagation();
		const meetingUrl = `${FRONT_BASE_URL}/?salesAppointmentID=${salesAppointment.salesAppointmentID}`;
		console.log(meetingUrl);
		await navigator.clipboard.writeText(meetingUrl);

		setCopiedStatus(prevStatus => ({
			...prevStatus,
			[salesAppointment.salesAppointmentID]: true,
		}));

		setTimeout(() => {
			setCopiedStatus(prevStatus => ({
				...prevStatus,
				[salesAppointment.salesAppointmentID]: false,
			}));
		}, 2000); // 2 seconds delay
	};

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
			name: 'meetingUrl',
			label: 'Meeting Url',
			render: (salesAppointment: SalesAppointmentInterface) => {
				const isCopied = copiedStatus[salesAppointment.salesAppointmentID] || false;
				return (
					<MeetingUrlCopyButton
						onClick={e => {
							handleCopyMeetingUrl(e, salesAppointment);
						}}
					>
						<IoCopyOutline />
						{isCopied ? 'Copied!' : 'Copy meeting url to clipboard'}
					</MeetingUrlCopyButton>
				);
			},
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
