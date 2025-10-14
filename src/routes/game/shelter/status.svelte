<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Card,
		CardHeader,
		CardTitle,
		CardBody,
		CardText,
	} from '@sveltestrap/sveltestrap';
	import type { PageProps } from './$types';
	import { authData } from '$lib/client/discord';

	let { data }: PageProps = $props();

	const resData = [
		{ name: 'Starlight', value: data.resource.starlight },
		{ name: 'Wrath', value: data.resource.wra },
		{ name: 'Lust', value: data.resource.lus },
		{ name: 'Sloth', value: data.resource.slo },
		{ name: 'Gluttony', value: data.resource.glo },
		{ name: 'Gloom', value: data.resource.glu },
		{ name: 'Pride', value: data.resource.pri },
		{ name: 'Envy', value: data.resource.env },
	];

	onMount(async () => {
		data.resource;
	});
</script>

<svelte:head>
	<title>Shelter/Status</title>
</svelte:head>

<Card theme="dark">
	<CardHeader>
		<CardTitle>Player Status</CardTitle>
	</CardHeader>
	<CardBody>
		<CardText>
			Player {authData.user.global_name} status
			<br />
			{#each resData as res}
				{res.name}: {res.value} <br />
			{/each}
		</CardText>
	</CardBody>
</Card>
