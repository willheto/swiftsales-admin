import { register } from '@src/api/services/authService';
import SwiftSalesButton from '@src/components/SwiftSalesComponents/SwiftSalesComponents';
import React, { useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import Alert from '../../components/Alert/Alert';
import { useUser } from '@src/context/UserContext';
import { useForm } from 'react-hook-form';
import Badge from '../../components/Badge/Badge';
import { capitalizeFirstLetter } from '@src/utils/utils';

const OrganizationSettings = () => {
	const { user } = useUser();
	const organization = user?.organization;

	const [alert, setAlert] = React.useState<{
		type: AlertType;
		message: string;
	} | null>(null);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, dirtyFields },
	} = useForm({
		defaultValues: {
			...organization,
		},
	});

	const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

	const saveOrganizationSettings = async (data: any) => {
		try {
			setIsSubmitting(true);
			const payload = {
				...data,
				organizationID: organization?.organizationID,
			};

			const response = await register(payload);
			setAlert({
				type: 'success',
				message: 'Organization settings saved successfully.',
			});
		} catch (e) {
			setAlert({
				type: 'danger',
				message: e.error,
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	if (!organization) return null;

	return (
		<Card className="p-3 overflow-auto w-75 align-self-center">
			<Card.Header className="p-0 pb-3 d-flex justify-content-between align-items-center">
				<h5 className="mb-0">Organization</h5>
			</Card.Header>
			<Form
				className="h-100 d-flex flex-column"
				style={{ marginTop: '15px' }}
				onSubmit={handleSubmit(saveOrganizationSettings)}
			>
				<div className="overflow-auto flex-fill gap-3 d-flex flex-column mb-3">
					<Form.Group className="d-flex flex-column">
						<Form.Label>Organization Name</Form.Label>
						{organization.organizationName}
					</Form.Group>

					<Form.Group className="d-flex flex-column">
						<Form.Label>License Type</Form.Label>
						{capitalizeFirstLetter(organization.licenseType)}
					</Form.Group>
				</div>

				{alert && <Alert type={alert.type} message={alert.message} />}
			</Form>
		</Card>
	);
};

export default OrganizationSettings;
