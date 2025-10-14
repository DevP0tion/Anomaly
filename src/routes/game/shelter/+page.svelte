<script lang="ts">
	import { ButtonGroup, Button } from '@sveltestrap/sveltestrap';
	import Status from './status.svelte';
	import Prepare from './prepare.svelte';
	import type { PageProps } from './$types';

	let props: PageProps = $props();

	let cardIndex = $state(0);
	const pages = [Status, Prepare];
</script>

<svelte:head>
	<title>Shelter</title>
</svelte:head>

<main>
	<ButtonGroup>
		<Button active={cardIndex === 0} on:click={() => (cardIndex = 0)}
			>Status</Button
		>
		<Button active={cardIndex === 1} on:click={() => (cardIndex = 1)}
			>Prepare</Button
		>
	</ButtonGroup>
	<div class="card">
		{#if pages[cardIndex]}
			{@const Page = pages[cardIndex]}
			<Page {...props} />
		{/if}
	</div>
</main>

<style lang="scss">
	main {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
	}

	.card {
		width: 100%;
		max-width: 600px;
	}
</style>
