import Service from './service';

class SalesAppointmentsService extends Service<SalesAppointmentInterface> {}

const salesAppointments = new SalesAppointmentsService({
	serviceURL: `sales-appointments`,
	keyParameter: 'salesAppointmentID',
	crudResponseObject: 'salesAppointment',
	crudResponseArray: 'salesAppointments',
});

export default salesAppointments;
