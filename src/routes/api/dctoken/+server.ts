import { PUBLIC_DISCORD_CLIENT_ID } from '$env/static/public';
import { DISCORD_CLIENT_SECRET } from '$env/static/private';

export async function POST({ request }) {
	const body = await request.json();
	const { code } = body;

	const { access_token } = await (
		await fetch('https://discord.com/api/oauth2/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({
				client_id: PUBLIC_DISCORD_CLIENT_ID,
				client_secret: DISCORD_CLIENT_SECRET,
				grant_type: 'authorization_code',
				code: code,
			}),
		})
	).json();

	return new Response(JSON.stringify({ access_token }));
}
