// Node types
const StartNode: 0 = 0;
const NormalNode: 1 = 1;
const BlankNode: 2 = 2;
const ShopNode: 3 = 3;
const EventNode: 4 = 4;
const EliteNode: 5 = 5;
const BossNode: 6 = 6;

export const NodeTypes = {
	Start: StartNode,
	Normal: NormalNode,
	Blank: BlankNode,
	Shop: ShopNode,
	Event: EventNode,
	Elite: EliteNode,
	Boss: BossNode,
} as const;

export type NodeTypes =
	| typeof StartNode
	| typeof NormalNode
	| typeof BlankNode
	| typeof ShopNode
	| typeof EventNode
	| typeof EliteNode
	| typeof BossNode;

// Path Types
const BlankPath: 0 = 0;
const TopPath: 1 = 1;
const BottomPath: 2 = 2;

export const PathTypes = {
	Top: TopPath,
	Bottom: BottomPath,
	Blank: BlankPath,
} as const;

export type PathTypes = typeof TopPath | typeof BottomPath | typeof BlankPath;

export type StageData = {
	readonly nodes: NodeTypes[][];
	readonly paths: PathTypes[][];
};
