<script lang="ts">
	import { AsyncStates } from '../utils/enums';

	export let apiState: AsyncStates = AsyncStates.initial;
	export let label = '';
	export let inProgressLabel = '';
	export let successLabel = '';
</script>

<input
	type="submit"
	class="w-full rounded bg-orange-500 font-medium h-11 py-2 px-3 text-white outline-none"
	value={apiState === AsyncStates.inProgress
		? inProgressLabel
		: apiState === AsyncStates.success
		? successLabel
		: label}
	disabled={[AsyncStates.inProgress, AsyncStates.success].includes(apiState)}
	class:cursor-not-allowed={apiState === AsyncStates.inProgress}
/>
