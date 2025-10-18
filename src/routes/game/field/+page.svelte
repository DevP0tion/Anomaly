<script lang="ts">
	import { onMount } from 'svelte';
	import FieldView from './fieldView.svelte';
	import Battle from './battle.svelte';
	import type { PageProps } from './$types';
	import type { StageClient } from '$lib/client/game/stage';
	import type { FieldComponents } from './+page';

	let { data }: PageProps = $props();

	let stageData = $state<StageClient>(data.stage),
		view: FieldComponents = $state<FieldComponents>('fieldView');

	onMount(() => {});
</script>

{#if view === 'fieldView'}
	<FieldView stage={stageData} bind:view />
{:else if view === 'battle'}
	<Battle bind:view />
{/if}

<style lang="scss">
</style>
