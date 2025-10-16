<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}

<style lang="scss">
	:global(body) {
		margin: 0;
		padding: 0;
		height: 100vh;

		background-color: #121212;
		color: white;

		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
