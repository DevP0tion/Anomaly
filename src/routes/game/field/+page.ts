import { StageClient } from '$lib/client/game/stage';
import type { PageLoad } from './$types';

export function load(params) {
	const stage = new StageClient(params.data.server.stageData);

	return { stage };
}

export type FieldComponents = 'fieldView' | 'battle';
