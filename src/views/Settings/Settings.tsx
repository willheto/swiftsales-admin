import api from '@src/api';
import Content from '@src/components/SwiftSalesAdmin/Content';
import SwiftSalesButton from '@src/components/SwiftSalesComponents/SwiftSalesComponents';
import { useUser } from '@src/context/UserContext';
import { getDirtyValues } from '@src/utils/utils';
import React from 'react';
import { Card, Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Alert from '../../components/Alert/Alert';
import OrganizationSettings from './OrganizationSettings';
import useMobile from '@src/hooks/useMobile';
import ChangePassword from './ChangePassword';

const Settings = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, dirtyFields },
	} = useForm();

	const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
	const [showPasswordChangeModal, setShowPasswordChangeModal] = React.useState<boolean>(false);

	const { user, setUser } = useUser();

	const [alert, setAlert] = React.useState<{
		type: AlertType;
		message: string;
	} | null>(null);

	const saveSettings = async (data: any) => {
		try {
			setIsSubmitting(true);
			let payload = {
				userID: user?.userID,
			};

			const dirtyValues = getDirtyValues(dirtyFields, data);
			if (dirtyValues) {
				payload = { ...payload, ...dirtyValues };
			}

			const response = await api.users.save(payload);
			setUser(response.user);
			setAlert({
				type: 'success',
				message: 'Settings saved successfully',
			});
			reset();
			setTimeout(() => {
				setAlert(null);
			}, 3000);
			reset;
		} catch (e) {
			console.log(e);
		} finally {
			setIsSubmitting(false);
		}
	};

	const isMobile = useMobile();

	if (!user) return null;

	return (
		<Content>
			<Modal show={showPasswordChangeModal} onHide={() => setShowPasswordChangeModal(false)} centered>
				<ChangePassword onSuccess={() => setShowPasswordChangeModal(false)} />
			</Modal>
			<div className="d-flex flex-column gap-3">
				<Card className={`p-3 overflow-auto ${isMobile ? 'w-100' : 'w-75'} align-self-center`}>
					<Card.Header className="p-0 pb-3 d-flex justify-content-between align-items-center">
						<h5 className="mb-0">User</h5>
					</Card.Header>
					<Form
						className="h-100 d-flex flex-column"
						style={{ marginTop: '15px' }}
						onSubmit={handleSubmit(saveSettings)}
					>
						<div className="overflow-auto flex-fill gap-3 d-flex flex-column mb-3">
							<Form.Group>
								<Form.Label>Email Address</Form.Label>
								<Form.Control type="email" {...register('email')} defaultValue={user.email} />
							</Form.Group>
							<Form.Group className="d-flex gap-3">
								<Form.Group>
									<Form.Label>First Name</Form.Label>
									<Form.Control
										type="text"
										{...register('firstName')}
										defaultValue={user.firstName}
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label>Last Name</Form.Label>
									<Form.Control type="text" {...register('lastName')} defaultValue={user.lastName} />
								</Form.Group>
							</Form.Group>

							{/*<Form.Group>
								<Form.Label>Time Zone</Form.Label>
								<Form.Select {...register('timeZone')} defaultValue={user.timeZone}>
									<option value="">Select time zone</option>
									{timeZones.map(timeZone => (
										<option key={timeZone} value={timeZone}>
											{timeZone}
										</option>
									))}
								</Form.Select>
							</Form.Group>*/}
						</div>

						{alert && <Alert type={alert.type} message={alert.message} />}
						<Form.Group className="mt-3 d-flex gap-2">
							<SwiftSalesButton
								variant="primary"
								size="small"
								type="submit"
								disabled={isSubmitting || Object.keys(dirtyFields).length === 0}
							>
								{isSubmitting ? 'Saving...' : 'Save'}
							</SwiftSalesButton>
							<SwiftSalesButton
								variant="primary"
								size="small"
								onClick={() => setShowPasswordChangeModal(true)}
							>
								Change Password
							</SwiftSalesButton>
						</Form.Group>
					</Form>
				</Card>
				<OrganizationSettings />
			</div>
		</Content>
	);
};

export default Settings;
