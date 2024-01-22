import api from '@src/api';
import Content from '@src/components/SwiftSalesAdmin/Content';
import SwiftSalesButton from '@src/components/SwiftSalesComponents/SwiftSalesComponents';
import { useUser } from '@src/context/UserContext';
import React from 'react';
import { Card } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const Settings = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { user } = useUser();

	const timeZones = [
		'Europe/Helsinki',
		'Europe/Stockholm',
		'Europe/London',
		'Europe/Paris',
		'Europe/Berlin',
		'Europe/Rome',
		'Europe/Madrid',
		'Europe/Warsaw',
		'Europe/Prague',
		'Europe/Athens',
		'Europe/Istanbul',
		'Europe/Moscow',
		'Europe/Kiev',
		'Europe/Volgograd',
		'Europe/Minsk',
		'Europe/Bucharest',
		'Europe/Amsterdam',
		'Europe/Dublin',
		'Europe/Brussels',
		'Europe/Vienna',
		'Europe/Zurich',
		'Europe/Oslo',
		'Europe/Copenhagen',
		'Europe/Bratislava',
		'Europe/Sofia',
		'Europe/Budapest',
		'Europe/Ljubljana',
		'Europe/Zagreb',
	];

	const saveSettings = async (data: any) => {
		try {
			const response = await api.users.save({ userID: user?.userID, ...data });
			console.log(response);
		} catch (e) {
			console.log(e);
		}
	};

	if (!user) return null;

	return (
		<Content>
			<h5>Settings</h5>

			<Card className="p-3 overflow-auto h-100">
				<Card.Header className="p-0 pb-3">Locale</Card.Header>
				<Form className="h-100 d-flex flex-column" onSubmit={handleSubmit(saveSettings)}>
					<div className="overflow-auto flex-fill mt-2">
						<Form.Group>
							<Form.Label>Time zone</Form.Label>
							<Form.Select className="w-25" {...register('timeZone')} defaultValue={user.timeZone}>
								<option value="">Select time zone</option>
								{timeZones.map(timeZone => (
									<option key={timeZone} value={timeZone}>
										{timeZone}
									</option>
								))}
							</Form.Select>
						</Form.Group>
					</div>

					<Form.Group>
						<SwiftSalesButton variant="primary" size="small" type="submit">
							Save
						</SwiftSalesButton>
					</Form.Group>
				</Form>
			</Card>
		</Content>
	);
};

export default Settings;
