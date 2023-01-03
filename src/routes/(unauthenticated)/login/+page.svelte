<script lang="ts">
	import { goto } from '$app/navigation';
	import FormButton from '$lib/components/FormButton.svelte';
	import FormInput from '$lib/components/FormInput.svelte';
	import { isNilOrEmpty, isPhoneNumberValid } from '$lib/utils/helpers';
	// import apis from '../../../lib/services/index';
	import { AsyncStates } from '../../../lib/utils/enums';

	let countryCode: any = 'IN';
	let phoneNumber = '';
	let password = '';
	let apiState = AsyncStates.initial;
	let errors: {
		phoneNumber: null | string;
		password: null | string;
	} = {
		phoneNumber: null,
		password: null
	};

	const validate = (fieldId: 'phoneNumber' | 'password', fieldValue: string) => {
		if (fieldId === 'phoneNumber') {
			if (isNilOrEmpty(fieldValue)) {
				errors.phoneNumber = 'Phone number is required';
			} else if (!isPhoneNumberValid(fieldValue, countryCode)) {
				errors.phoneNumber = 'Phone number is not valid';
			} else {
				errors.phoneNumber = null;
			}

			return errors.phoneNumber;
		} else if (fieldId === 'password') {
			if (isNilOrEmpty(fieldValue)) {
				errors.password = 'Password is required';
			} else if (fieldValue.length < 8) {
				errors.password = 'Password must be at least 8 characters';
			} else {
				errors.password = null;
			}

			return errors.password;
		}
	};

	const resetValidation = (fieldId: 'phoneNumber' | 'password') => {
		if (fieldId === 'phoneNumber') {
			errors.phoneNumber = null;
		} else if (fieldId === 'password') {
			errors.password = null;
		}
	};

	const handelOnBlur = (event: any) => {
		const fieldId = event.target.id;
		const fieldValue = event.target.value;

		validate(fieldId, fieldValue);
	};
	const handelOnInput = (event: any) => {
		const fieldId = event.detail.id;

		resetValidation(fieldId);
	};

	const handleSubmit = async () => {
		const isInValidPhoneNumber = validate('phoneNumber', phoneNumber);
		const isInValidPassword = validate('password', password);

		if (isInValidPhoneNumber || isInValidPassword) {
			return;
		}

		apiState = AsyncStates.inProgress;

		const response: any = {}; //await apis.userApis.initiateSignUpUserApi(phoneNumber);

		if (response.success) {
			apiState = AsyncStates.success;
			goto('/');
		} else {
			apiState = AsyncStates.error;
		}
	};
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Login" />
</svelte:head>

<form
	on:submit|preventDefault={handleSubmit}
	class="flex justify-center flex-col m-auto w-full max-w-sm"
>
	<h1 class="text-3xl font-bold">Login</h1>

	<div class="w-96 mt-6">
		<FormInput
			type="number"
			id="phoneNumber"
			label="Phone"
			placeholder="Enter phone number"
			error={errors.phoneNumber}
			bind:value={phoneNumber}
			on:blur={handelOnBlur}
			on:input={handelOnInput}
		/>
	</div>

	<div class="w-96">
		<FormInput
			type="password"
			id="password"
			label="Password"
			placeholder="Enter password"
			error={errors.password}
			bind:value={password}
			on:blur={handelOnBlur}
			on:input={handelOnInput}
		/>
	</div>

	<a class="text-sm text-orange-500 text-right" href="/forgot-password?source=glue"
		>Forgot Password ?</a
	>

	<div class="w-96 mt-3">
		<FormButton
			bind:apiState
			label="Login"
			inProgressLabel="Logging in..."
			successLabel="Redirecting..."
		/>
	</div>

	<p class="text-center text-gray-500 pt-6">
		Don't have an account?
		<a class="font-bold text-orange-500" href="/signup?source=glue">Sign up for free!</a>
	</p>
</form>
