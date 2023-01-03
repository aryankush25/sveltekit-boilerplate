<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let value: string;
	export let id: string;
	export let label: string;
	export let placeholder = '';
	export let type: string = 'text';
	export let error: string = '';

	const handleInput = (e: any) => {
		value = type.match(/^(number|range)$/) ? +e.target.value : e.target.value;

		dispatch('input', { value, id });
	};
</script>

<div class="pb-1 w-full">
	<label for={id} class="pl-0.5 text-sm font-medium text-gray-700">{label}</label>

	<input
		{type}
		{id}
		{value}
		{placeholder}
		name={id}
		on:input={handleInput}
		on:blur
		on:focus
		class="w-full rounded border outline-none border-gray focus:border-orange-500 text-sm h-10 py-2 px-3 mt-1"
	/>

	<div class="pl-0.5 text-sm font-medium text-red-500 h-5" class:invisible={!error}>{error}</div>
</div>
