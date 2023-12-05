import Service from './service';

class LeadsService extends Service<LeadInterface> {}

const leads = new LeadsService({
	serviceURL: `leads`,
	keyParameter: 'leadID',
	crudResponseObject: 'lead',
});

export default leads;
