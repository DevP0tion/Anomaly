import { StageServer } from '$lib/server/game/stage';

export async function load(params) {
	const stage = new StageServer({
		length: 5,
		height: 5,
		nodeConfig: {
			shop: 0,
			event: 3,
			elite: 6,
		},
	});

	return { server: { stageData: stage.toJSON() } };
}
