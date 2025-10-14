import { authData } from '$lib/client/discord';
import { getUserResource } from '../../api/commands/discord.remote';
import type { PageLoad } from './$types';

export async function load() {
	const userRes = await getUserResource(authData.user.id);
	return { resource: userRes };
}
