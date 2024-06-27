import api from '@src/api';
import SwiftSalesButton from '@src/components/SwiftSalesComponents/SwiftSalesComponents';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type LeadFormProps = {
	lead?: LeadInterface | null;
	onClose: () => void;
	successCallback: () => void;
};

const LeadForm = ({ lead, onClose, successCallback }: LeadFormProps) => {
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { dirtyFields },
	} = useForm({
		defaultValues: {
			...lead,
		},
	});

	const onSubmit = async (data: any) => {
		try {
			setIsSubmitting(true);
			let payload: any;

			// Add only dirty fields to payload
			Object.keys(dirtyFields).forEach(key => {
				payload = { ...payload, [key]: data[key] };
			});

			if (lead) {
				payload = { ...payload, leadID: lead.leadID };
			}

			await api.leads.save(payload);
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
			if (lead) {
				await api.leads.deleteSingle(lead.leadID);
				successCallback();
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<Form className="p-4" onSubmit={handleSubmit(onSubmit)}>
			<h5>{lead ? 'Edit' : 'Create'} lead</h5>
			<div className="d-flex flex-column gap-2 mt-4">
				<Form.Group className="required">
					<Form.Label>Company name</Form.Label>
					<Form.Control
						maxLength={100}
						type="text"
						{...register('companyName', {
							required: true,
						})}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Business ID</Form.Label>
					<Form.Control maxLength={100} type="text" {...register('businessID')} />
				</Form.Group>
				<Form.Group className="d-flex gap-2">
					<Form.Group className="w-50">
						<Form.Label>Contact person</Form.Label>
						<Form.Control maxLength={100} type="text" {...register('contactPerson')} />
					</Form.Group>
					<Form.Group className="w-50">
						<Form.Label>Contact phone</Form.Label>
						<Form.Control maxLength={100} type="text" {...register('contactPhone')} />
					</Form.Group>
				</Form.Group>
				<Form.Group>
					<Form.Label>Contact email</Form.Label>
					<Form.Control maxLength={100} type="text" {...register('contactEmail')} />
				</Form.Group>
				<Form.Group>
					<Form.Label>Notes</Form.Label>
					<Form.Control maxLength={1000} rows={5} as="textarea" {...register('notes')} />
				</Form.Group>
			</div>
			{error && <div className="text-danger">{error}</div>}

			<div className="d-flex gap-2 mt-4">
				<SwiftSalesButton
					size="small"
					variant="primary"
					type="submit"
					disabled={
						// Disable save button if form is not dirty
						!Object.keys(dirtyFields).length || isSubmitting
					}
				>
					Save
				</SwiftSalesButton>
				<SwiftSalesButton size="small" variant="secondary" onClick={onClose}>
					Cancel
				</SwiftSalesButton>
				{lead && (
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

export default LeadForm;
