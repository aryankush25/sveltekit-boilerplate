import { PUBLIC_ENV } from '$env/static/public';

let serverUrl = 'http://localhost:4000';

switch (PUBLIC_ENV) {
	case 'base':
		serverUrl = 'https://user.glue.is';
		break;

	case 'beta':
	case 'qa':
	case 'qa2':
		serverUrl = 'https://user.' + PUBLIC_ENV + '.glue.is';
		break;
	default:
		break;
}

const envConfig = {
	SERVER_URL: serverUrl,
	ENV: PUBLIC_ENV
};

export default envConfig;
