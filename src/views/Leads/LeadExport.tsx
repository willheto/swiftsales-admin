import { StyledDropArea, StyledSection } from '@src/components/DropArea/DropArea';
import React, { useEffect, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import Papa from 'papaparse';
import SwiftSalesButton from '@src/components/SwiftSalesComponents/SwiftSalesComponents';
import api from '@src/api';
import { bytesToMegabytes } from '@src/utils/utils';
import Alert from '@src/components/Alert/Alert';

const LeadExport = ({ onClose, successCallback }) => {
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
		multiple: false,
		accept: {
			csv: ['.csv'],
		},
	});

	const [error, setError] = useState<string | null>(null);
	const [csvHeaders, setCsvHeaders] = useState([]);
	const [csvData, setCsvData] = useState([]);
	const { handleSubmit, register } = useForm();
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	useEffect(() => {
		if (acceptedFiles.length > 0) {
			const file = acceptedFiles[0];
			Papa.parse(file, {
				complete: result => {
					setCsvHeaders(result.data[0]);
					setCsvData(result.data.slice(1));
				},
				header: false,
			});
		}
	}, [acceptedFiles]);

	const isCompanyNameMapped = data => {
		const columnMapValues = Object.values(data.columnMap);
		return columnMapValues.includes('companyName');
	};

	const onSubmit = async (data: any) => {
		try {
			if (!isCompanyNameMapped(data)) {
				setError('Company name must be mapped');
				return;
			}

			setIsSubmitting(true);
			const leads = csvData.map((row: any) => {
				const lead = {};
				row.forEach((value, index) => {
					const key = data.columnMap[index];
					//if key is empty string, skip
					if (key === '') return;
					lead[key] = value;
				});

				//if empty object, skip
				if (Object.keys(lead).length === 0) return;
				return lead;
			});

			await api.leads.saveBatch({
				leads: leads.filter(lead => lead !== undefined),
			});
			successCallback();
		} catch (e) {
			console.log(e);
		} finally {
			setIsSubmitting(false);
		}
	};

	const leadFields = [
		'businessID',
		'companyName',
		'contactPerson',
		'contactPhone',
		'contactEmail',
		'header',
		'description',
	];

	const noMappingsSelected = Object.values(leadFields).every(value => value === '');

	const renderMappingModal = () => {
		return (
			<div className="border-top pt-4">
				<Form.Group className="d-flex flex-column mb-2">
					<Form.Label className="mb-0">Step 2 - Map Columns</Form.Label>
					<Form.Text className="mt-0">At least company name must be mapped</Form.Text>
				</Form.Group>
				<div className="d-flex flex-wrap">
					{csvHeaders.map((header, index) => {
						const isEven = index % 2 === 0;
						return (
							<Form.Group key={index} className={`w-50 mb-2 ${isEven ? 'pe-2' : 'ps-2'}`}>
								<Form.Label>{header}</Form.Label>
								<Form.Control as="select" {...register(`columnMap[${index}]`)}>
									<option value="">Select a field</option>
									{leadFields.map((field, index) => (
										<option key={index} value={field}>
											{field}
										</option>
									))}
								</Form.Control>
							</Form.Group>
						);
					})}
				</div>
			</div>
		);
	};

	return (
		<Form className="p-4" onSubmit={handleSubmit(onSubmit)}>
			<h5>Import leads</h5>
			<div className="d-flex flex-column gap-2 mt-4">
				<Form.Group>
					<Form.Label>Step 1 - Upload import file</Form.Label>
					<StyledSection>
						<StyledDropArea {...getRootProps({ className: 'dropzone' })}>
							<input {...getInputProps()} />
							<p>
								{acceptedFiles.length > 0
									? `Drag 'n' drop a CSV file here to replace the current file`
									: `Drag 'n' drop a CSV file here, or click to select files`}
							</p>
						</StyledDropArea>
						<aside>
							<Form.Text className="text-muted">Allowed filetypes: .csv</Form.Text>
						</aside>
					</StyledSection>
				</Form.Group>
				{acceptedFiles.length > 0 && (
					<div className="d-flex mt-1 gap-1 align-items-center mb-4">
						<Form.Label className="mb-0">Selected File: </Form.Label>
						<Form.Text className="text-muted" style={{ marginTop: '2px' }}>
							{` ${acceptedFiles[0].name} - ${bytesToMegabytes(acceptedFiles[0].size)} MB`}
						</Form.Text>
					</div>
				)}
				{csvHeaders.length > 0 && renderMappingModal()}
				{error && <Alert type="danger" message={error} />}
				<div className="d-flex gap-2">
					<SwiftSalesButton
						variant="primary"
						size="small"
						type="submit"
						disabled={isSubmitting || acceptedFiles.length === 0 || noMappingsSelected}
					>
						{isSubmitting ? 'Importing...' : 'Import'}
					</SwiftSalesButton>
					<SwiftSalesButton size="small" variant="secondary" onClick={onClose}>
						Cancel
					</SwiftSalesButton>
				</div>
			</div>
		</Form>
	);
};

export default LeadExport;
