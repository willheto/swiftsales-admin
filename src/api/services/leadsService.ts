import axiosInstance from '../axiosInstance';
import Service from './service';

class LeadsService extends Service<LeadInterface> {
	public async saveBatch(data: any): Promise<any> {
		const url = `${this.baseURL}/batch`;
		const response = await axiosInstance.post(url, data);
		return response;
	}
}

const leads = new LeadsService({
	serviceURL: `leads`,
	keyParameter: 'leadID',
	crudResponseObject: 'lead',
	crudResponseArray: 'leads',
});

export default leads;
