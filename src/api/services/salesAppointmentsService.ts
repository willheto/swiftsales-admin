import Service from './service';
import axiosInstance from '../axiosInstance';

class SalesAppointmentsService extends Service<SalesAppointmentInterface> {
	public async renewMeetingUrl(salesAppointmentID: number): Promise<SalesAppointmentInterface> {
		const response = await axiosInstance.post(`${this.serviceURL}/${salesAppointmentID}/renew-meeting-url`);
		return response[this.crudResponseObject];
	}
}

const salesAppointments = new SalesAppointmentsService({
	serviceURL: `sales-appointments`,
	keyParameter: 'salesAppointmentID',
	crudResponseObject: 'salesAppointment',
	crudResponseArray: 'salesAppointments',
});

export default salesAppointments;
