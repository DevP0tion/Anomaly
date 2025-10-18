import { NodeTypes, type StageData } from '$lib/types/game/stage';
import type { Vector2 } from '$lib/types/global';
import { EventEmitter } from 'eventemitter3';

export class StageClient extends EventEmitter<{
	move: [number, number, NodeTypes];
}> {
	public readonly nodes: StageData['nodes'];
	public readonly passedPositions: Vector2[];
	public position: Vector2;

	public constructor(data: StageData) {
		super();

		this.nodes = data.nodes;
		this.position = { x: -1, y: 0 };
		this.passedPositions = [];
	}

	public get height(): number {
		return this.nodes.length;
	}

	public get width(): number {
		return this.nodes[0].length;
	}

	public get selectable(): Vector2[] {
		const selectable: Vector2[] = [],
			{ x, y } = this.position,
			width = this.width,
			height = this.height;

		if (x === -1) {
			for (let dy = 0; dy < height; dy++) {
				selectable.push({ x: 0, y: dy });
			}
		}

		if (x >= 0 && x < width) {
			for (
				let dy = y - 1 < 0 ? 0 : y - 1,
					ey = y + 1 >= height ? height - 1 : y + 1;
				dy <= ey;
				dy++
			) {
				const targetNode = this.nodes[dy][x + 1];

				if (targetNode !== NodeTypes.Blank) {
					selectable.push({ x: x + 1, y: dy });
				}
			}
		}

		return selectable;
	}

	public moveToNode(x: number, y: number): void {
		this.passedPositions.push({ x, y });
		this.position = { x, y };
		this.emit('move', x, y, this.nodes[y][x]);
	}
}
