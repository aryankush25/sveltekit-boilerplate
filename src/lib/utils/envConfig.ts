import { PUBLIC_ENV } from '$env/static/public';

let serverUrl = 'http://localhost:4000';

switch (PUBLIC_ENV) {
	case 'base':
		serverUrl = 'https://gluelabs.com';
		break;

	case 'beta':
	case 'qa':
	case 'qa2':
		serverUrl = 'https://' + PUBLIC_ENV + '.gluelabs.com';
		break;
	default:
		break;
}

const envConfig = {
	SERVER_URL: serverUrl,
	ENV: PUBLIC_ENV
};

export default envConfig;
