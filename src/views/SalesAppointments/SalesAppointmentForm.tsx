import api from '@src/api';
import SwiftSalesButton from '@src/components/SwiftSalesComponents/SwiftSalesComponents';
import { useUser } from '@src/context/UserContext';
import React, { useCallback, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { bytesToMegabytes, getBase64 } from '@src/utils/utils';
import { StyledSection, StyledDropArea } from '@src/components/DropArea/DropArea';

type SalesAppointmentFormProps = {
	salesAppointment?: SalesAppointmentInterface | null;
	leads: LeadInterface[];
	onClose: () => void;
	successCallback: () => void;
};

const SalesAppointmentForm = ({ salesAppointment, leads, onClose, successCallback }: SalesAppointmentFormProps) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { dirtyFields },
	} = useForm({
		defaultValues: {
			...salesAppointment,
		},
	});

	const [error, setError] = React.useState<string | null>(null);
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
		maxSize: 10485760,
		accept: {
			image: ['.jpg', '.jpeg', '.png', '.gif'],
			pdf: ['.pdf'],
			word: ['.doc', '.docx'],
			excel: ['.xls', '.xlsx'],
			powerpoint: ['.ppt', '.pptx'],
		},
	});
	const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

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

	const handleFileDrop = useCallback(async () => {
		try {
			const base64: any = await getBase64(acceptedFiles[0]);

			// @ts-expect-error
			setValue('salesAppointmentFiles', [{ base64File: base64, fileName: acceptedFiles[0].name }], {
				shouldValidate: true,
				shouldDirty: true,
			});
		} catch (e) {
			console.log(e);
		}
	}, [acceptedFiles, setValue]);

	useEffect(() => {
		if (acceptedFiles.length > 0) {
			handleFileDrop();
		}
	}, [acceptedFiles, handleFileDrop]);

	const files = acceptedFiles.map(file => (
		<li key={file.name}>
			{file.name} - {bytesToMegabytes(file.size)} MB
		</li>
	));

	const salesAppointmentFilesExist =
		salesAppointment?.salesAppointmentFiles && salesAppointment.salesAppointmentFiles.length > 0;

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
				<Form.Group>
					<Form.Label>Files</Form.Label>

					<StyledSection>
						<StyledDropArea {...getRootProps({ className: 'dropzone' })}>
							<input {...getInputProps()} />
							<p>Drag 'n' drop some files here, or click to select files</p>
						</StyledDropArea>
						<aside>
							<div className="d-flex flex-column">
								<Form.Text className="text-muted">
									Allowed filetypes: .jpg, .jpeg, .png, .gif, .pdf, .doc, .docx, .xls, .xlsx, .ppt,
									.pptx
								</Form.Text>
								<Form.Text className="text-muted">Maximum filesize: 10 MB</Form.Text>
							</div>
							<Form.Group className="mt-2">
								<Form.Text className="text-muted">
									Interested in more filetypes or need more filesize capacity? Contact us at{' '}
									<a href="mailto: info@swiftsales.fi">sales@swiftsales.fi</a>
								</Form.Text>
							</Form.Group>
							{salesAppointmentFilesExist && (
								<>
									<Form.Label className="mt-2">Existing files</Form.Label>
									<ul>
										{salesAppointment?.salesAppointmentFiles.map(salesAppointmentFile => (
											<li key={salesAppointmentFile.salesAppointmentFileID}>
												<a href={salesAppointmentFile.file.filePath} target="_blank">
													{salesAppointmentFile.file.fileName}
												</a>
											</li>
										))}
									</ul>
								</>
							)}
							{acceptedFiles.length > 0 && (
								<>
									<Form.Label>Accepted files</Form.Label>
									<ul>{files}</ul>
								</>
							)}
						</aside>
					</StyledSection>
				</Form.Group>
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
