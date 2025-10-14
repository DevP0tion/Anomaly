<script lang="ts">
	import { onMount } from 'svelte';
	import type { StageClient } from '$lib/client/game/stage';

	let { stage }: { stage: StageClient } = $props();

	onMount(() => {});
</script>

<svelte:head>
	<title>Field View</title>
</svelte:head>
<div>{JSON.stringify(stage)}</div>
