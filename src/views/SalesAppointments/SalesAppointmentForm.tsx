import api from '@src/api';
import SwiftSalesButton from '@src/components/SwiftSalesComponents/SwiftSalesComponents';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import SalesAppointmentFiles from './SalesAppointmentFiles';
import DatePicker from '@src/components/DatePicker/DatePicker';
import fi from 'date-fns/locale/fi';
import useParseDate from '@src/hooks/useParseDate';
import { DateTime } from 'luxon';

type SalesAppointmentFormProps = {
	salesAppointment?: SalesAppointmentInterface | null;
	leads: LeadInterface[];
	onClose: () => void;
	successCallback: () => void;
};

const SalesAppointmentForm = ({
	salesAppointment,
	leads,
	onClose,
	successCallback,
}: SalesAppointmentFormProps): JSX.Element | null => {
	const methods = useForm({
		defaultValues: {
			...salesAppointment,
		},
	});

	const {
		setValue,
		register,
		handleSubmit,
		formState: { dirtyFields },
	} = methods;

	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const onSubmit = async (data: Partial<SalesAppointmentInterface>): Promise<void> => {
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

	const handleDelete = async (): Promise<void> => {
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
				<Form.Group className="required">
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
					{leads.length === 0 && <Form.Text className="text-danger">You need to create a lead before creating sales appointments.</Form.Text>}
				</Form.Group>
				<Form.Group>
					<Form.Label>Notes</Form.Label>
					<Form.Control maxLength={1000} type="text" as="textarea" rows={6} {...register('notes')} />
					<Form.Text className="text-muted">These notes will be shown to everyone in the meeting.</Form.Text>
				</Form.Group>
				<Form.Group className="d-flex flex-column required">
					<Form.Label>Meeting start time</Form.Label>
					<DatePicker
						showYearDropdown
						id="timeStart"
						timeZone={'Europe/Helsinki'}
						value={methods.watch('timeStart')}
						onChange={date =>
							setValue('timeStart', date, {
								shouldDirty: true,
							})
						}
						autoComplete="on"
						showTimeSelect="true"
						required={true}
					/>
				</Form.Group>
				<Form.Group className="d-flex flex-column required">
					<Form.Label>Meeting end time</Form.Label>
					<DatePicker
						showYearDropdown
						id="timeEnd"
						timeZone={'Europe/Helsinki'}
						value={methods.watch('timeEnd')}
						onChange={date => setValue('timeEnd', date, { shouldDirty: true })}
						autoComplete="on"
						showTimeSelect="true"
						required={true}
					/>
				</Form.Group>
				<SalesAppointmentFiles methods={methods} />
				{/*<Form.Label>Settings</Form.Label>
				<Form.Group>
					<Form.Switch
						id="isCustomerAllowedToShareFiles"
						label="Is customer allowed to share files?"
						{...register('isCustomerAllowedToShareFiles')}
					/>
				</Form.Group>
				<Form.Group className="d-flex flex-column gap-2">
					<Form.Switch
						id="isSalesAppointmentSecuredWithPassword"
						label="Is sales appointment secured with password?"
						{...register('isSalesAppointmentSecuredWithPassword')}
					/>
					{methods.watch('isSalesAppointmentSecuredWithPassword') && (
						<div className="d-flex align-items-center gap-2">
							<div className="d-flex flex-column">
								<Form.Label className="mb-0" style={{ marginLeft: '40px' }}>
									Password
								</Form.Label>
								<div className="d-flex align-items-center gap-2">
									<BsArrowReturnRight size="30" />
									<Form.Control
										maxLength={100}
										className="w-50"
										type="text"
										placeholder="Password"
										{...register('password', { required: true })}
									/>
								</div>
							</div>
						</div>
					)}
				</Form.Group>*/}
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
