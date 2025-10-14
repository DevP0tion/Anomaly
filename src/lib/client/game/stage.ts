import type { StageData } from '$lib/types/game/stage';

export class StageClient {
	public readonly nodes: StageData['nodes'];
	public readonly paths: StageData['paths'];

	public constructor(data: StageData) {
		this.nodes = data.nodes;
		this.paths = data.paths;
	}
}
