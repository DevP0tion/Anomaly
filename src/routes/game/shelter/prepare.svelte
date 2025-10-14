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
		<CardTitle>Prepare for the adventure!</CardTitle>
	</CardHeader>
	<CardBody>
		<CardText>
			Get ready for an exciting journey ahead. Make sure you have everything you
			need!
			<Button href="/game/field" color="primary">Next</Button>
		</CardText>
	</CardBody>
</Card>
