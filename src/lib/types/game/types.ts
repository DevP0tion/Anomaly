export type SinType =
	| 'Wrath'
	| 'Lust'
	| 'Sloth'
	| 'Gluttony'
	| 'Gloom'
	| 'Pride'
	| 'Envy'
	| 'None';

export const SinColor = {
	Wrath: 'red', // 분노
	Lust: 'orange', // 색욕
	Sloth: 'yellow', // 나태
	Gluttony: 'green', // 탐식
	Gloom: 'cyan', // 우울
	Pride: 'blue', // 오만
	Envy: 'purple', // 질투
	None: 'gray',
};

export type Tier = 'ZAYIN' | 'TETH' | 'HE' | 'WAW' | 'ALEPH';
