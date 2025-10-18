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
			nodeConfig: { shop, blank, event, elite },
		} = config;

		const height = config.height;
		const length = config.length + 3;

		const result: NodeTypes[][] = Array.from({ length: height }, () =>
			Array.from({ length: length }, () => NodeTypes.Normal)
		);

		const indexSet = new Set(
			Array.from({ length: height * length }, (_, i) => i)
		);

		{
			// 0, length - 2, length - 1 열은 시작, 상점, 보스 노드로 고정

			for (let y = 0; y < height; y++) {
				indexSet.delete(y * length);
				indexSet.delete(y * length + (length - 2));
				indexSet.delete(y * length + (length - 1));
			}

			// 시작, 상점, 보스 노드 배치
			for (let y = 0; y < height; y++) {
				result[y][0] = NodeTypes.Start;
				result[y][length - 2] = NodeTypes.Shop;
				result[y][length - 1] = NodeTypes.Boss;
			}
		}

		{
			// 노드 배치

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
					const y = Math.floor(pos / length);
					const x = pos % length;
					result[y][x] = nodeType;
				}
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
