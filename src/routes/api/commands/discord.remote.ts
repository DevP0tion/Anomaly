import { query, command } from '$app/server';
import { createQuery, db } from '$lib/server/db';
import type {
	BaseScheme,
	BaseTableScheme,
	ResourceScheme,
	ResourceTableScheme,
} from '$lib/server/dbTable';

export const getUserBase = query('unchecked', async (discordId: string) => {
	const [result] = await db.query(
		`SELECT * FROM Base WHERE uuid = ${discordId}`
	);

	if (Array.isArray(result) && result.length > 0) {
		return result[0] as BaseScheme;
	} else {
		throw new Error('User not found');
	}
});

export const getUserResource = query('unchecked', async (discordId: string) => {
	const [result] = await db.query(
		`SELECT * FROM Resource WHERE uuid = ${discordId}`
	);

	if (Array.isArray(result) && result.length > 0) {
		return result[0] as ResourceScheme;
	} else {
		throw new Error('User not found');
	}
});

export const updateUser = command(
	'unchecked',
	async (userData: BaseTableScheme['data']) => {
		try {
			await createQuery<BaseTableScheme>(
				'MERGE',
				{ uuid: userData.uuid },
				userData
			).run(db, 'Base');

			await createQuery<ResourceTableScheme>('INSERT', {
				uuid: userData.uuid,
				starlight: 0,
				wra: 0,
				lus: 0,
				slo: 0,
				glu: 0,
				glo: 0,
				pri: 0,
				env: 0,
			}).run(db, 'Resource');
		} catch (err: any) {
			if (err?.code === 'ER_DUP_ENTRY') {
				console.log(`User ${userData.uuid} already exists, skipping creation.`);
			} else console.log(err);
		}
	}
);
