<script lang="ts">
	import { goto } from '$app/navigation';
	import FormButton from '$lib/components/FormButton.svelte';
	import FormInput from '$lib/components/FormInput.svelte';
	// import apis from '../../../lib/services/index';
	import { AsyncStates } from '../../../lib/utils/enums';

	let countryCode = '+91';
	let phoneNumber = '';
	let password = '';
	let apiState = AsyncStates.initial;

	$: {
		console.log('$$$$ phoneNumber', phoneNumber);
		console.log('$$$$ password', password);
	}

	const handleSubmit = async () => {
		apiState = AsyncStates.inProgress;

		const response: any = {}; //await apis.userApis.initiateSignUpUserApi(phoneNumber);

		if (response.success) {
			apiState = AsyncStates.success;
			goto('/');
		} else {
			apiState = AsyncStates.error;
		}
	};

	const handelOnBlur = (event: any) => {
		console.log('#### handelOnBlur event', event);
	};
	const handelOnFocus = (event: any) => {
		console.log('#### handelOnFocus event', event);
	};
	const handelOnInput = (event: any) => {
		console.log('#### handelOnInput event', event);
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
			id="phoneNumber"
			label="Phone"
			placeholder="Enter phone number"
			bind:value={phoneNumber}
			on:blur={handelOnBlur}
			on:focus={handelOnFocus}
			on:input={handelOnInput}
		/>
	</div>

	<div class="w-96">
		<FormInput
			id="password"
			label="Password"
			placeholder="Enter password"
			bind:value={password}
			on:blur={handelOnBlur}
			on:focus={handelOnFocus}
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
