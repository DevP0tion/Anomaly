import type { StageData } from '$lib/types/game/stage';

export class StageClient {
	public readonly nodes: StageData['nodes'];

	public constructor(data: StageData) {
		this.nodes = data.nodes;
	}
}
