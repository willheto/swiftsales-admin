import api from '@src/api';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { IoLockOpenOutline } from 'react-icons/io5';
import { useUser } from '@src/context/UserContext';
import axiosInstance from '@src/api/axiosInstance';
import { checkPassword } from '@src/api/services/authService';
import { ErrorMessage } from '@hookform/error-message';
import SwiftSalesButton from '@src/components/SwiftSalesComponents/SwiftSalesComponents';

type PropTypes = {
	onSuccess: () => void;
	forgotPassword?: boolean;
};

const ChangePassword = (props: PropTypes): JSX.Element => {
	const { user } = useUser();
	const { onSuccess, forgotPassword } = props;
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isPasswordWrong, setIsPasswordWrong] = useState<boolean>(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm();

	const onSubmit = async (data: {
		oldPassword: string;
		newPassword: string;
		newPasswordRepeat: string;
	}): Promise<void> => {
		try {
			if (!user) return;
			if (data.newPassword !== data.newPasswordRepeat) {
				return;
			}
			setIsLoading(true);

			const payload = {
				userID: user.userID,
				password: data.oldPassword,
			};

			const response = await checkPassword(payload);

			// @ts-expect-error response is valid
			if (response.isValid) {
				const payload = {
					userID: user.userID,
					password: data.newPassword,
				};
				await axiosInstance.patch(API_BASE_URL + '/users', payload);
				onSuccess();
			}
		} catch (error) {
			setIsPasswordWrong(true);
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="p-4 d-flex flex-column position-relative">
			<>
				<Form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column">
					<div className="align-self-center pb-4">
						<IoLockOpenOutline size={55} />
					</div>
					<Form.Group className="text-center">
						<h3>Change password</h3>
						Password must be at least 8 characters long
					</Form.Group>
					<div className="gap-2 mt-4 d-flex flex-column">
						{!forgotPassword && (
							<div className="d-flex flex-column">
								<Form.Label>Current password</Form.Label>
								<Form.Control
									type="password"
									{...register('oldPassword', {
										required: 'Insert your current password',
									})}
								/>
								{isPasswordWrong ? (
									<p className="text-danger mb-0">Wrong password</p>
								) : (
									<ErrorMessage
										errors={errors}
										name="oldPassword"
										render={({ message }) => <p className="text-danger mb-0">{message}</p>}
									/>
								)}
							</div>
						)}

						<div className="d-flex flex-column">
							<Form.Label>New password</Form.Label>
							<Form.Control
								minLength={8}
								type="password"
								{...register('newPassword', {
									required: 'Insert your new password',
								})}
							/>
							<ErrorMessage
								errors={errors}
								name="newPassword"
								render={({ message }) => <p className="text-danger mb-0">{message}</p>}
							/>
						</div>
						<div className="d-flex flex-column">
							<Form.Label>New password again</Form.Label>
							<Form.Control
								minLength={8}
								type="password"
								{...register('newPasswordRepeat', {
									required: 'Insert your new password again',
								})}
							/>
							{watch('newPassword') !== watch('newPasswordRepeat') ? (
								<p className="text-danger mb-0">Passwords do not match</p>
							) : (
								<ErrorMessage
									errors={errors}
									name="newPasswordRepeat"
									render={({ message }) => <p className="text-danger mb-0">{message}</p>}
								/>
							)}
						</div>
					</div>
					<div className="d-flex mt-3 gap-2">
						<SwiftSalesButton variant="primary" size="small" type="submit" disabled={isLoading}>
							{isLoading ? 'Saving' : 'Save'}
						</SwiftSalesButton>
						<SwiftSalesButton variant="secondary" size="small" onClick={onSuccess}>
							Cancel
						</SwiftSalesButton>
					</div>
				</Form>
			</>
		</div>
	);
};

export default ChangePassword;
