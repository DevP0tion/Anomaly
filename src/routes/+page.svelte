<script lang="ts">
	import { onMount } from 'svelte';
	import { setupDiscordSdk, authData, discordSdk } from '$lib/client/discord';
	import { getUserBase } from './api/commands/discord.remote';
	import { goto } from '$app/navigation';
	import { loadTranslations } from '$lib/client/translation';

	let logs: string[] = $state(['Initializing...']);

	onMount(async () => {
		logs.push('Setting up Discord SDK...');
		await setupDiscordSdk(logs);
		logs.push('Ready.');
		logs.push(`Hello, ${authData.user.global_name}!`);

		logs.push('Fetching user data from server...');
		const userData = await getUserBase(authData.user.id);
		if (userData) {
			logs.push(`User data found: ${JSON.stringify(userData)}`);
		} else {
			logs.push('No user data found for this Discord ID.');
		}

		const locale = (await discordSdk.commands.userSettingsGetLocale()).locale;
		await loadTranslations(locale);
		logs.push(`Locale set to ${locale}. Redirecting to /game/shelter...`);

		goto('/game/shelter');
	});
</script>

{#each logs as log}
	{log} <br />
{/each}
