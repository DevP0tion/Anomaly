<script lang="ts">
	import { Button } from '@sveltestrap/sveltestrap';
	import type { FieldComponents } from './+page';
	import { onMount } from 'svelte';
	import {
		type Battle,
		type BattlePlayerController,
		initializeBattle,
		type SkillBlob,
	} from '$lib/client/game/battle';

	let { view = $bindable<FieldComponents>() } = $props();

	let controller: BattlePlayerController, battle: Battle, close: () => void;
	let hand: SkillBlob[] = $state([]);

	onMount(async () => {
		({ controller, battle, close } = await initializeBattle());

		controller.on('addSkillToHand', () => {
			hand = controller.skillHand;
		});
	});
</script>

<div>
	Battle Component
	<div>
		<h3>Player Skills in Hand:</h3>
		<ul>
			{#key hand}
				{#each hand as skill}
					<li>{skill.name}</li>
				{/each}
			{/key}
		</ul>
	</div>
	<Button
		on:click={() => {
			view = 'fieldView';
			close();
		}}>Go to Field View</Button
	>
</div>

<style lang="scss"></style>
