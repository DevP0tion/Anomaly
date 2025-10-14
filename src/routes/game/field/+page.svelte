<script lang="ts">
	import { onMount } from 'svelte';
	import FieldView from './fieldView.svelte';
	import type { PageProps } from './$types';
	import type { StageClient } from '$lib/client/game/stage';

	let { data }: PageProps = $props();

	let stageData = $state<StageClient>(data.stage);

	onMount(() => {});
</script>

<main>
	<FieldView stage={stageData} />
</main>

<style lang="scss">
</style>
