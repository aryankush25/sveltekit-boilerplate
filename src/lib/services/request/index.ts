// import { Blob } from 'buffer';
import * as R from 'ramda';
import { clearTokens, getTokens } from '../../utils/tokenHelper';
import { isPresent } from '../../utils/helpers';
import type { ApiRequestMethods } from '../../utils/enums';
import envConfig from '../../utils/envConfig';

const request = async (
	route: string,
	method: ApiRequestMethods,
	{
		header = { 'Content-Type': 'application/json' },
		body,
		auth = true,
		authToken
	}: {
		header?: { [x: string]: string };
		body?: unknown;
		auth?: boolean;
		authToken?: string;
	} = {}
): Promise<{
	success: boolean;
	data?: unknown;
	error?: unknown;
}> => {
	let myHeaders = {};
	const headerKeys = R.keys(header) as string[];

	myHeaders = R.assoc('Accept', '*/*', myHeaders);

	if (auth) {
		const accessToken = authToken ? authToken : getTokens().accessToken;

		myHeaders = R.assoc('Authorization', `Bearer ${accessToken}`, myHeaders);
	}

	headerKeys.forEach((headerKey) => {
		myHeaders = R.assoc(headerKey, header[headerKey], myHeaders);
	});

	const raw = isPresent(body) ? JSON.stringify(body) : null;

	const requestOptions = {
		method: method,
		headers: myHeaders,
		body: raw
	};

	const response = fetch(envConfig.SERVER_URL + route, requestOptions)
		.then((response) => {
			const contentType = response.headers.get('content-type');

			console.info(`Response of ${route}`, response);
			console.info(`contentType of ${route}`, contentType);

			if (response.ok) {
				if (R.includes('image/png', `${contentType}`)) {
					return response.blob();
				} else if (R.includes('application/json', `${contentType}`)) {
					return response.json();
				}

				return response.text();
			}

			if (response.status === 401) {
				// Clear tokens here and redirect to /login
				clearTokens();

				window.location.replace('/login');
			}

			throw new Error(response.statusText);
		})
		.then((result) => {
			console.info(`Result of ${route}`, result);

			// if (result instanceof Blob) {
			// 	return {
			// 		success: true,
			// 		data: URL.createObjectURL(result)
			// 	};
			// }1

			return {
				success: true,
				data: result
			};
		})
		.catch((error) => {
			console.error(`Error of ${route}`, error);

			return {
				success: false,
				error: error
			};
		});

	return response;
};

export default request;
