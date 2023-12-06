declare const API_BASE_URL: string;

interface UserInterface {
	userID: number;
	firstName: string;
	lastName: string;
	email: string;
}

interface LeadInterface {
	leadID: number;
	businessID: number | null;
	companyName: string;
	contactPerson: string | null;
	contactPhone: string | null;
	contactEmail: string | null;
	header: string | null;
	description: string | null;
	created_at: string;
	updated_at: string;
}

interface SalesAppointmentInterface {
	salesAppointmentID: number;
	leadID: number;
	timeStart: string;
	timeEnd: string;
	notes: string | null;
	created_at: string;
	updated_at: string;
}
