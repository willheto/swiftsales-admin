import React, { useCallback, useEffect } from 'react';
import Table from '../../components/Table/Table';
import { Card, Modal } from 'react-bootstrap';
import Content from '@src/components/SwiftSalesAdmin/Content';
import SwiftSalesButton from '@src/components/SwiftSalesComponents/SwiftSalesComponents';
import api from '@src/api';
import { useUser } from '@src/context/UserContext';
import styled from 'styled-components';
import SalesAppointmentForm from './SalesAppointmentForm';
import { IoCopyOutline, IoReloadOutline } from 'react-icons/io5';
import useParseDate from '@src/hooks/useParseDate';
import useSearch from '@src/hooks/useSearch';

const SalesAppointments = () => {
	const { user } = useUser();
	const { parseDate } = useParseDate();
	const [salesAppointments, setSalesAppointments] = React.useState<SalesAppointmentInterface[]>();
	const [copiedStatus, setCopiedStatus] = React.useState<{ [key: number]: boolean }>({});
	const [renewingStatus, setRenewingStatus] = React.useState<{ [key: number]: boolean }>({});
	const [leads, setLeads] = React.useState<LeadInterface[]>();

	const { renderSearchField, filteredResources } = useSearch(salesAppointments || [], {
		searchColumns: ['notes'],
		customResourcesForFiltering: {
			leads: leads || [],
		},
	});

	const fetchSalesAppointments = useCallback(async () => {
		try {
			if (!user) return;
			const response = await api.salesAppointments.getAllByUserID(user.userID);
			setSalesAppointments(response);
		} catch (e) {
			console.log(e);
		}
	}, [user]);

	const fetchLeads = useCallback(async () => {
		try {
			if (!user) return;
			const response = await api.leads.getAllByUserID(user.userID);

			setLeads(response);
		} catch (e) {
			console.log(e);
		}
	}, [user]);

	useEffect(() => {
		fetchSalesAppointments();
		fetchLeads();
	}, [fetchSalesAppointments, fetchLeads]);

	const handleCopyMeetingUrl = async (e: any, salesAppointment: SalesAppointmentInterface) => {
		e.stopPropagation();
		const meetingUrl = `${FRONT_BASE_URL}/?salesAppointmentID=${salesAppointment.salesAppointmentID}`;
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

	const handleMeetingUrlRenew = async (e: any, salesAppointment: SalesAppointmentInterface) => {
		e.stopPropagation();
		try {
			setRenewingStatus(prevStatus => ({
				...prevStatus,
				[salesAppointment.salesAppointmentID]: true,
			}));
			await api.salesAppointments.renewMeetingUrl(salesAppointment.salesAppointmentID);
			fetchSalesAppointments();
		} catch (e) {
			console.log(e);
		} finally {
			setRenewingStatus(prevStatus => ({
				...prevStatus,
				[salesAppointment.salesAppointmentID]: false,
			}));
		}
	};

	const columns = [
		{
			name: 'leadID',
			label: 'Lead',
			render: (salesAppointment: SalesAppointmentInterface) => {
				const lead = leads?.find(lead => lead.leadID === salesAppointment.leadID);
				return <span>{lead?.companyName}</span>;
			},
		},
		{
			name: 'notes',
			label: 'Notes',
			render: (salesAppointment: SalesAppointmentInterface) => {
				const notes = salesAppointment.notes || '';
				if (notes.length > 50) {
					return <span>{notes?.substring(0, 50)}...</span>;
				}
				return <span>{salesAppointment.notes}</span>;
			},
		},
		{
			name: 'meetingUrl',
			label: 'Meeting Url',
			render: (salesAppointment: SalesAppointmentInterface) => {
				if (!salesAppointment.meetingUrl) {
					return (
						<MeetingUrlCopyButton
							onClick={e => {
								handleMeetingUrlRenew(e, salesAppointment);
							}}
							disabled={renewingStatus[salesAppointment.salesAppointmentID] || false}
						>
							<SpinningRenewIcon
								theme={{
									spin: renewingStatus[salesAppointment.salesAppointmentID] || false,
								}}
							>
								<IoReloadOutline />
							</SpinningRenewIcon>
							{renewingStatus[salesAppointment.salesAppointmentID] ? 'Renewing...' : 'Renew meeting url'}
						</MeetingUrlCopyButton>
					);
				}
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
			name: 'meetingExpiryTime',
			label: 'Meeting Expiry Time',
			render: (salesAppointment: SalesAppointmentInterface) => {
				return salesAppointment.meetingExpiryTime ? (
					<span>{parseDate(salesAppointment.meetingExpiryTime)}</span>
				) : (
					<span>Expired</span>
				);
			},
		},

		{
			name: 'isCustomerAllowedToShareFiles',
			label: 'Is Customer Allowed To Share Files',
			render: (salesAppointment: SalesAppointmentInterface) => {
				return salesAppointment.isCustomerAllowedToShareFiles ? <span>Yes</span> : <span>No</span>;
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
			{leads && (
				<SalesAppointmentFormModal
					centered
					size="lg"
					show={editingSalesAppointment !== undefined}
					onHide={() => setEditingSalesAppointment(undefined)}
				>
					<SalesAppointmentForm
						salesAppointment={editingSalesAppointment}
						leads={leads}
						onClose={() => setEditingSalesAppointment(undefined)}
						successCallback={() => {
							refetch();
							setEditingSalesAppointment(undefined);
						}}
					/>
				</SalesAppointmentFormModal>
			)}
			<Content>
				<Card className="p-3 overflow-auto">
					<Card.Header className="p-0 pb-3 d-flex justify-content-between align-items-center flex-wrap gap-2">
						<div className="d-flex gap-2 justify-content-between flex-fill flex-wrap">
							<h5 className="mb-0">Sales Appointments</h5>
							{renderSearchField()}
						</div>
						<div className="d-flex gap-2 justify-content-end">
							<SwiftSalesButton
								variant="primary"
								size="small"
								onClick={() => setEditingSalesAppointment(null)}
							>
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

const SpinningRenewIcon = styled.div`
	display: flex;

	${props =>
		props.theme.spin &&
		'animation: spin 1s linear infinite; @keyframes spin { 100% { transform: rotate(360deg); }}'};
`;

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

const SalesAppointmentFormModal = styled(Modal)``;
export default SalesAppointments;
