<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';
	import {
		Card,
		CardHeader,
		CardTitle,
		CardBody,
		CardText,
		Button,
	} from '@sveltestrap/sveltestrap';

	let { data }: PageProps = $props();

	onMount(() => {});
</script>

<svelte:head>
	<title>Shelter/Prepare</title>
</svelte:head>

<Card theme="dark">
	<CardHeader>
		<CardTitle>Season 0: Paper barn</CardTitle>
	</CardHeader>
	<CardBody>
		<CardText>
			<div class="cardText">
				<Button href="/game/field" color="primary">던전 진입</Button>
			</div>
		</CardText>
	</CardBody>
</Card>

<style lang="scss">
	.cardText {
		display: flex;
		flex-direction: column;
		font-size: 16px;
		line-height: 1.5;
		color: #fff;
	}
</style>
