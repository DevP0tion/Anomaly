// Import the SDK
import { DiscordSDK } from '@discord/embedded-app-sdk';
import { PUBLIC_DISCORD_CLIENT_ID } from '$env/static/public';
import { updateUser } from '../../routes/api/commands/discord.remote';

// Instantiate the SDK
const discordSdk = new DiscordSDK(PUBLIC_DISCORD_CLIENT_ID);
let authData: DiscordAuthData = undefined as unknown as DiscordAuthData;

export async function setupDiscordSdk(logger: string[]) {
	logger.push('Starting Discord SDK setup...');
	await discordSdk.ready();

	if (authData !== undefined) {
		logger.push('Already authenticated with Discord SDK.');
		return;
	}

	logger.push('Authorizing with Discord...');
	const { code } = await discordSdk.commands.authorize({
		client_id: PUBLIC_DISCORD_CLIENT_ID,
		response_type: 'code',
		state: '',
		prompt: 'none',
		scope: ['identify', 'guilds', 'applications.commands'],
	});

	logger.push('Exchanging code for token...');
	const response = await fetch('/api/dctoken', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			code,
		}),
	});

	const res = await response.json();

	logger.push('Authenticating with Discord SDK...');

	try {
		authData = await discordSdk.commands.authenticate({
			access_token: res.access_token,
		});
	} catch (e) {
		authData = undefined as unknown as DiscordAuthData;
		throw new Error('Authenticate command failed');
	} finally {
		await updateUser({
			uuid: authData.user.id,
			name: authData.user.username + '#' + authData.user.discriminator,
		});
	}
}

export { discordSdk, authData };
