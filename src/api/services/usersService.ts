import Service from './service';

class UsersService extends Service<UserInterface> {}

const users = new UsersService({
	serviceURL: `users`,
	keyParameter: 'userID',
	crudResponseObject: 'user',
	crudResponseArray: 'users',
});

export default users;
