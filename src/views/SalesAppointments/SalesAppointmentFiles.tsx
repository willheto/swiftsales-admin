import { StyledSection, StyledDropArea } from '@src/components/DropArea/DropArea';
import SwiftSalesButton from '@src/components/SwiftSalesComponents/SwiftSalesComponents';
import { bytesToMegabytes, getBase64 } from '@src/utils/utils';
import React, { useCallback, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

const MAX_FILE_SIZE = 10485760;
const ACCEPTED_FILE_TYPES = {
	'image/jpeg': [],
	'image/png': [],
	'image/gif': [],
	'application/pdf': [],
	'application/msword': [],
	'application/vnd.ms-excel': [],
	'application/vnd.ms-powerpoint': [],
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
};

const SalesAppointmentFiles = ({ methods }) => {
	const { setValue, watch } = methods;
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
		maxSize: MAX_FILE_SIZE,
		accept: ACCEPTED_FILE_TYPES,
	});

	const handleFileDrop = useCallback(async () => {
		try {
			const existingNewFiles = watch('salesAppointmentFiles') || [];
			const newFilesPromises = acceptedFiles.map(async file => {
				const base64: string = await getBase64(file);
				return { base64File: base64, fileName: file.name };
			});

			const newFiles = await Promise.all(newFilesPromises);

			// @ts-ignore
			setValue('salesAppointmentFiles', [...existingNewFiles, ...newFiles], {
				shouldValidate: true,
				shouldDirty: true,
			});
		} catch (e) {
			console.log(e);
		}
	}, [acceptedFiles, setValue, watch]);

	useEffect(() => {
		if (acceptedFiles.length > 0) {
			handleFileDrop();
		}
	}, [acceptedFiles, handleFileDrop]);

	const existingSalesAppointmentFiles =
		watch('salesAppointmentFiles')?.filter((file: any) => file.salesAppointmentFileID && !file.delete) || [];
	const newSalesAppointmentFiles =
		watch('salesAppointmentFiles')?.filter((file: any) => !file.salesAppointmentFileID) || [];

	const removeExistingSalesAppointmentFile = (salesAppointmentFileID: number) => {
		setValue(
			'salesAppointmentFiles',
			watch('salesAppointmentFiles')?.map((file: any) => {
				if (file.salesAppointmentFileID === salesAppointmentFileID) {
					return {
						salesAppointmentFileID: file.salesAppointmentFileID,
						delete: true,
					};
				}
				return file;
			}),
			{
				shouldValidate: true,
				shouldDirty: true,
			},
		);
	};

	return (
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
							All uploaded files are available for preview and download during the sales appointment.
						</Form.Text>
						<Form.Text className="text-muted">
							Allowed filetypes: .jpg, .jpeg, .png, .gif, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx
						</Form.Text>
						<Form.Text className="text-muted">Maximum filesize: 10 MB</Form.Text>
					</div>
					{/*<Form.Group className="mt-2">
						<Form.Text className="text-muted">
							Interested in more filetypes or need more filesize capacity? Contact us at{' '}
							<a href="mailto: info@swiftsales.fi">sales@swiftsales.fi</a>
						</Form.Text>
					</Form.Group>*/}
					{existingSalesAppointmentFiles.length > 0 && (
						<>
							<Form.Label className="mt-2">Existing files</Form.Label>
							<ul>
								{existingSalesAppointmentFiles.map(
									(salesAppointmentFile: SalesAppointmentFileInterface) => (
										<li key={salesAppointmentFile.salesAppointmentFileID} className="mb-2 gap-2">
											<FileText>
												<a href={salesAppointmentFile.file?.filePath} target="_blank">
													{salesAppointmentFile.file?.fileName}
												</a>
												<SwiftSalesButton
													size="small"
													variant="danger"
													onClick={() => {
														removeExistingSalesAppointmentFile(
															salesAppointmentFile.salesAppointmentFileID,
														);
													}}
												>
													Remove
												</SwiftSalesButton>
											</FileText>
										</li>
									),
								)}
							</ul>
						</>
					)}
					{newSalesAppointmentFiles.length > 0 && (
						<>
							<Form.Label className="mt-2">New files</Form.Label>
							<ul>
								{newSalesAppointmentFiles.map((newSalesAppointmentFile: any) => (
									<li key={newSalesAppointmentFile.fileName} className="mb-2">
										<FileText>
											<span className="me-2">
												{newSalesAppointmentFile.fileName} -{' '}
												{bytesToMegabytes(newSalesAppointmentFile.base64File.length)} MB
											</span>
											<SwiftSalesButton
												size="small"
												variant="danger"
												onClick={() => {
													setValue(
														'salesAppointmentFiles',
														watch('salesAppointmentFiles')?.filter(
															(file: any) =>
																file.fileName !== newSalesAppointmentFile.fileName,
														),
													);
												}}
											>
												Remove
											</SwiftSalesButton>
										</FileText>
									</li>
								))}
							</ul>
						</>
					)}
				</aside>
			</StyledSection>
		</Form.Group>
	);
};

const FileText = styled.span`
	justify-content: space-between;
	gap: 0.5rem;
	display: flex;
	white-space: nowrap;

	a {
		max-width: 70%;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	&:hover {
		background-color: #f8f9fa;
	}
`;

export default SalesAppointmentFiles;
