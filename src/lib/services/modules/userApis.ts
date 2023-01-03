import R from 'ramda';
import request from '../request';
import { isPresent } from 'src/lib/utils/helpers';
import { setTokens } from 'src/lib/utils/tokenHelper';
import { ApiRequestMethods } from 'src/lib/utils/enums';

const initiateSignUpUserApi = async (phoneNumber: string) => {
	const route = '/auth/initiate/sign-up';

	const response = await request(route, ApiRequestMethods.post, {
		body: { phoneNumber },
		auth: false
	});

	return response;
};

const verifyOtpSignUpApi = async (otp: string, phone: string, name: string, password: string) => {
	const route =
		'/auth/verify/sign-up' +
		'?client_id=cc220a6b-2785-45d2-b1c5-b33dd2d358c9' +
		'&redirect_uri=http://localhost:3000/redirect/callback';

	const response = await request(route, ApiRequestMethods.post, {
		body: {
			otp,
			userInput: {
				phone,
				name,
				password
			}
		},
		auth: false
	});

	const token = R.pathOr('', ['token'], response);

	if (response.success && isPresent(token)) {
		setTokens({
			accessToken: token
		});
	}

	return response;
};

const userApis = {
	initiateSignUpUserApi,
	verifyOtpSignUpApi
};

export default userApis;
