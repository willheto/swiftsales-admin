declare const API_BASE_URL: string;
declare const FRONT_BASE_URL: string;

type AlertType = 'success' | 'danger' | 'warning' | 'info';

interface UserInterface {
	userID: number;
	firstName: string;
	lastName: string;
	email: string;
	timeZone: string;
	organization: OrganizationInterface;
	organizationID: number;
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
	meetingUrl: string;
	isCustomerAllowedToShareFiles: boolean;
	isSalesAppointmentSecuredWithPassword: boolean;
	password: string | null;
	salesAppointmentFiles: SalesAppointmentFileInterface[];
	meetingExpiryTime?: string;
	created_at: string;
	updated_at: string;
}

interface SalesAppointmentFileInterface {
	salesAppointmentFileID: number;
	salesAppointmentID: number;
	fileID: number;
	file: FileInterface;
	created_at: string;
	updated_at: string;
}

interface FileInterface {
	fileID: number;
	fileName: string;
	filePath: string;
	fileType: string;
	created_at: string;
	updated_at: string;
}

interface OrganizationInterface {
	organizationID: number;
	organizationName: string;
	licenseType: string;
	created_at: string;
	updated_at: string;
}
