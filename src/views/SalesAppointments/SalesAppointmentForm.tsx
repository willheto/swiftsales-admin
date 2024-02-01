import api from '@src/api';
import SwiftSalesButton from '@src/components/SwiftSalesComponents/SwiftSalesComponents';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import SalesAppointmentFiles from './SalesAppointmentFiles';

type SalesAppointmentFormProps = {
	salesAppointment?: SalesAppointmentInterface | null;
	leads: LeadInterface[];
	onClose: () => void;
	successCallback: () => void;
};

const SalesAppointmentForm = ({ salesAppointment, leads, onClose, successCallback }: SalesAppointmentFormProps) => {
	const methods = useForm({
		defaultValues: {
			...salesAppointment,
		},
	});

	const {
		register,
		handleSubmit,
		formState: { dirtyFields },
	} = methods;

	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const onSubmit = async (data: any) => {
		try {
			setIsSubmitting(true);
			let payload: any;

			// Add only dirty fields to payload
			Object.keys(dirtyFields).forEach(key => {
				payload = { ...payload, [key]: data[key] };
			});

			if (salesAppointment) {
				payload = { ...payload, salesAppointmentID: salesAppointment.salesAppointmentID };
			}

			if (payload.salesAppointmentFiles) {
				// delete all files with id and without delete flag
				payload.salesAppointmentFiles = payload.salesAppointmentFiles.filter((file: any) => {
					if (!file.salesAppointmentFileID) {
						return true;
					}
					return file.salesAppointmentFileID && file.delete;
				});
				if (payload.salesAppointmentFiles.length === 0) {
					delete payload.salesAppointmentFiles;
				}
			}

			await api.salesAppointments.save(payload);
			successCallback();
		} catch (e) {
			setError(e.error);
			console.log(e);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleDelete = async () => {
		try {
			if (salesAppointment) {
				await api.salesAppointments.deleteSingle(salesAppointment.salesAppointmentID);
				successCallback();
			}
		} catch (e) {
			console.log(e);
		}
	};

	if (!leads) return null;

	return (
		<Form className="p-4" onSubmit={handleSubmit(onSubmit)}>
			<h5>{salesAppointment ? 'Edit' : 'Create'} Sales appointment</h5>
			<div className="d-flex flex-column gap-2 mt-4">
				<Form.Group>
					<Form.Label>Lead</Form.Label>
					<Form.Select
						{...register('leadID', {
							setValueAs: (value: any) => {
								return Number(value);
							},
							required: true,
						})}
					>
						<option value="">Select lead</option>
						{leads.map(lead => (
							<option key={lead.leadID} value={lead.leadID}>
								{lead.companyName}
							</option>
						))}
					</Form.Select>
				</Form.Group>
				<Form.Group>
					<Form.Label>Notes</Form.Label>
					<Form.Control type="text" as="textarea" rows={6} {...register('notes')} />
				</Form.Group>
				<SalesAppointmentFiles methods={methods} />
				<Form.Group>
					<Form.Label>Settings</Form.Label>
					<Form.Switch
						id="isCustomerAllowedToShareFiles"
						label="Is customer allowed to share files?"
						{...register('isCustomerAllowedToShareFiles')}
					/>
				</Form.Group>
			</div>
			{error && <div className="text-danger">{error}</div>}
			<div className="d-flex gap-2 mt-4">
				<SwiftSalesButton
					size="small"
					variant="primary"
					type="submit"
					disabled={
						isSubmitting ||
						// Disable save button if form is not dirty
						!Object.keys(dirtyFields).length
					}
				>
					{isSubmitting ? 'Saving...' : 'Save'}
				</SwiftSalesButton>
				<SwiftSalesButton size="small" variant="secondary" onClick={onClose}>
					Cancel
				</SwiftSalesButton>
				{salesAppointment && (
					<div className="ms-auto">
						<SwiftSalesButton size="small" variant="danger" onClick={handleDelete}>
							Remove
						</SwiftSalesButton>
					</div>
				)}
			</div>
		</Form>
	);
};

export default SalesAppointmentForm;
