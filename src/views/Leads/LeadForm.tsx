import api from '@src/api';
import SwiftSalesButton from '@src/components/SwiftSalesComponents/SwiftSalesComponents';
import { useUser } from '@src/context/UserContext';
import React from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

type LeadFormProps = {
	lead?: LeadInterface | null;
	onClose: () => void;
	successCallback: () => void;
};

const LeadForm = ({ lead, onClose, successCallback }: LeadFormProps) => {
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
			console.log(data);
			let payload: any;

			// Add only dirty fields to payload
			Object.keys(dirtyFields).forEach(key => {
				payload = { ...payload, [key]: data[key] };
			});

			if (lead) {
				payload = { ...payload, leadID: lead.leadID };
			}

			const response = await api.leads.save(payload);
			console.log(response);
			successCallback();
		} catch (e) {
			console.log(e);
		}
	};

	const handleDelete = async () => {
		try {
			if (lead) {
				const response = await api.leads.deleteSingle(lead.leadID);
				console.log(response);
				successCallback();
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<Form className="p-4" onSubmit={handleSubmit(onSubmit)}>
			<h5>{lead ? 'Edit' : 'Create'} lead</h5>
			<div className="d-flex flex-column gap-2">
				<Form.Group>
					<Form.Label>Company name</Form.Label>
					<Form.Control type="text" {...register('companyName')} />
				</Form.Group>
				<Form.Group>
					<Form.Label>Business ID</Form.Label>
					<Form.Control type="text" {...register('businessID')} />
				</Form.Group>
				<Form.Group>
					<Form.Label>Contact person</Form.Label>
					<Form.Control type="text" {...register('contactPerson')} />
				</Form.Group>
				<Form.Group>
					<Form.Label>Contact phone</Form.Label>
					<Form.Control type="text" {...register('contactPhone')} />
				</Form.Group>
				<Form.Group>
					<Form.Label>Contact email</Form.Label>
					<Form.Control type="text" {...register('contactEmail')} />
				</Form.Group>
				<Form.Group>
					<Form.Label>Header</Form.Label>
					<Form.Control type="text" {...register('header')} />
				</Form.Group>
				<Form.Group>
					<Form.Label>Description</Form.Label>
					<Form.Control as="textarea" {...register('description')} />
				</Form.Group>
			</div>
			<div className="d-flex gap-2 mt-4">
				<SwiftSalesButton
					size="small"
					variant="primary"
					type="submit"
					disabled={
						// Disable save button if form is not dirty
						!Object.keys(dirtyFields).length
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
