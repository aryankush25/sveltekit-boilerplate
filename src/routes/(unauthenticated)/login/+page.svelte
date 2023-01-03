<script lang="ts">
	import { goto } from '$app/navigation';
	import FormButton from '$lib/components/FormButton.svelte';
	import Input from '$lib/components/FormInput.svelte';
	// import apis from '../../../lib/services/index';
	import { AsyncStates } from '../../../lib/utils/enums';

	let countryCode = '+91';
	let phoneNumber = '';
	let password = '';
	let apiState = AsyncStates.initial;

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
		<Input
			id="phoneNumber"
			label="Phone"
			bind:value={phoneNumber}
			placeholder="Enter phone number"
		/>
	</div>

	<div class="w-96">
		<Input id="password" label="Password" bind:value={password} placeholder="Enter password" />
	</div>

	<div class="w-96 mt-6">
		<FormButton
			bind:apiState
			label="Login"
			inProgressLabel="Logging in..."
			successLabel="Redirecting..."
		/>
	</div>
</form>
