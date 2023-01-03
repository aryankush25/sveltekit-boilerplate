import * as R from 'ramda';
import { getCookie, isPresent } from './helpers';

export const ACCESS_TOKEN = 'fifo-access-token';
export const REFRESH_TOKEN = 'fifo-refresh-token';

export const getTokens = () => {
	const tokens = { accessToken: '', refreshToken: '' };

	const accessToken = getCookie(ACCESS_TOKEN);
	if (isPresent(accessToken)) {
		tokens.accessToken = R.pathOr('', [], accessToken);
	}

	return tokens;
};

export const setTokens = ({ accessToken }: { accessToken: string }) => {
	document.cookie = `${ACCESS_TOKEN}=${accessToken}; path=/;`;
};

export const isAccessTokenPresent = ({ accessToken } = getTokens()) =>
	isPresent(accessToken) && !(accessToken === 'undefined');

export const clearTokens = () => {
	document.cookie = `${ACCESS_TOKEN}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
