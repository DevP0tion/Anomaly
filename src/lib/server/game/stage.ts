import { NodeTypes, PathTypes, type StageData } from '$lib/types/game/stage';
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
	public readonly paths: PathTypes[][];

	public constructor(config: StageGenConfig) {
		this.nodes = this.generateNodes(config);
		this.paths = this.generatePaths();
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

	private generatePaths(): PathTypes[][] {
		const nodes = this.nodes;

		const result: PathTypes[][] = Array.from(
			{ length: this.height - 1 },
			(_, y) =>
				Array.from({ length: this.width - 1 }, (_, x) => {
					const beforeTop = nodes[y][x];
					const beforeBottom = nodes[y + 1][x];
					const afterTop = nodes[y][x + 1];
					const afterBottom = nodes[y + 1][x + 1];

					let topChace =
							beforeBottom !== NodeTypes.Blank && afterTop !== NodeTypes.Blank
								? 4
								: 0,
						bottomChace =
							beforeTop !== NodeTypes.Blank && afterBottom !== NodeTypes.Blank
								? 4
								: 0,
						blankChace = 2;

					const rand = Math.random() * (topChace + bottomChace + blankChace);

					if (rand < topChace) return PathTypes.Top;
					if (rand < topChace + bottomChace) return PathTypes.Bottom;
					if (rand < topChace + bottomChace + blankChace)
						return PathTypes.Blank;

					return PathTypes.Blank;
				})
		);

		return result;
	}

	public toJSON(): StageData {
		return {
			nodes: this.nodes,
			paths: this.paths,
		};
	}
}
