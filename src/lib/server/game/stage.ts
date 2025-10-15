import { NodeTypes, type StageData } from '$lib/types/game/stage';
import { sampleFromSet } from '$lib/util/math';

export type StageGenConfig = {
	height: number;
	length: number;
	nodeConfig: {
		shop?: number;
		blank?: number;
		event?: number;
		elite?: number;
	};
};

export class StageServer {
	public readonly nodes: NodeTypes[][];

	public constructor(config: StageGenConfig) {
		this.nodes = this.generateNodes(config);
	}

	public get height(): number {
		return this.nodes.length;
	}

	public get width(): number {
		return this.nodes[0].length;
	}

	private generateNodes(config: StageGenConfig): NodeTypes[][] {
		const {
			height,
			length,
			nodeConfig: { shop, blank, event, elite },
		} = config;

		const result: NodeTypes[][] = Array.from({ length: height }, () =>
			Array.from({ length: length }, () => NodeTypes.Normal)
		);

		const indexSet = new Set(
			Array.from({ length: height * length }, (_, i) => i)
		);

		const nodePool: [NodeTypes, number][] = [
			[NodeTypes.Shop, shop ?? 0],
			[NodeTypes.Blank, blank ?? 0],
			[NodeTypes.Event, event ?? 0],
			[NodeTypes.Elite, elite ?? 0],
		];

		for (const [nodeType, amount] of nodePool) {
			if (amount <= 0) continue;
			const positions = sampleFromSet(indexSet, amount, {
				replace: true,
				allowPartial: false,
			});

			for (const pos of positions) {
				const row = Math.floor(pos / length);
				const col = pos % length;
				result[row][col] = nodeType;
			}
		}

		return result;
	}

	public toJSON(): StageData {
		return {
			nodes: this.nodes,
		};
	}
}
