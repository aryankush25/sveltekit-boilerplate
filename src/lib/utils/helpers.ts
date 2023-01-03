import * as R from 'ramda';
import { isValidPhoneNumber, parsePhoneNumber, type CountryCode } from 'libphonenumber-js';

export const isNilOrEmpty = R.anyPass([R.isNil, R.isEmpty]);
export const isPresent = R.complement(isNilOrEmpty);
export const wait = (ms: number) =>
	new Promise((resolve) => {
		setTimeout(() => resolve('Resolved'), ms);
	});

export const getCookie = (cookieName: string) => {
	const name = cookieName + '=';
	const decodedCookie = decodeURIComponent(document.cookie);
	const cookieArr = decodedCookie.split('; ');
	let res;

	cookieArr.forEach((cookie) => {
		if (cookie.indexOf(name) === 0) res = cookie.substring(name.length);
	});

	return res;
};

export const isPhoneNumberValid = (phoneNumber: string, code: CountryCode = 'IN') =>
	isValidPhoneNumber(phoneNumber, code);

export const getParsedPhoneNumber = (phoneNumber: string, code: CountryCode = 'IN') => {
	const parsedNumber = parsePhoneNumber(phoneNumber, code);
	return R.path(['number'], parsedNumber);
};
