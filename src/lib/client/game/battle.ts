import type { SinType } from '$lib/types/game/types';
import { sampleFromArray } from '$lib/util/math';
import { EventEmitter } from 'eventemitter3';

export class Battle extends EventEmitter<{}> {
	public constructor() {
		super();
	}
}

export class BattlePlayerController extends EventEmitter<{
	useSkill: [SkillBlob, SkillBlob[]];
	addSkillToHand: SkillBlob[];
	close: [];
}> {
	public health: number = 10;
	public maxHealth: number = 10;
	public staggers: number[] = [];
	public atkLevel: number = 1;
	public defLevel: number = 1;

	private _skillCycle: boolean = false;

	public maxHandSize: number = 5;
	public skillHand: SkillBlob[] = [];
	public skillDeck: SkillBlob[] = [
		{ name: 'Slash', sinType: 'None', once: false },
		{ name: 'Dash', sinType: 'Wrath', once: false },
		{ name: 'Pierce', sinType: 'Pride', once: false },
	];
	public skillBin: SkillBlob[] = [];

	public constructor(staggerRatio: number[]) {
		super();

		this.staggers = staggerRatio
			.map((ratio) => Math.ceil(this.maxHealth * ratio))
			.filter((value) => value < this.health)
			.sort((a, b) => b - a);

		this.skillCycle = true;

		this.on('close', () => {
			this.skillCycle = false;
		});
	}

	private skillCycleInterval: NodeJS.Timeout | null = null;

	public get skillCycle(): boolean {
		return this._skillCycle;
	}

	public set skillCycle(value: boolean) {
		this._skillCycle = value;
		const cycleTime = 3;

		if (value) {
			// 사이클이 켜지면 특정시간마다 덱에서 스킬을 보충
			let interval: NodeJS.Timeout;
			interval = setInterval(() => {
				if ((!this || !this.skillHand) && interval !== undefined) {
					clearInterval(interval);
					return;
				}

				if (this.skillDeck.length > 0) {
					if (this.skillHand.length >= this.maxHandSize) {
						return;
					}

					const skills = sampleFromArray(this.skillDeck, 1, {
						mode: 'replace',
					});
					this.addSkillToHand(...skills);
					this.skillBin.push(...skills);
				} else {
					// 덱이 비었으면 휴지통에서 재생성
					this.skillDeck.push(...this.skillBin);
					this.skillBin = [];
				}
			}, cycleTime * 1000);

			this.skillCycleInterval = interval;
		} else if (this.skillCycleInterval !== null) {
			// 사이클이 꺼지면 인터벌 제거
			clearInterval(this.skillCycleInterval);
			this.skillCycleInterval = null;
		}
	}

	public useSkill(index: number) {
		const hand = this.skillHand;
		const skill = hand[index];
		const linkedSkill: SkillBlob[] = [],
			linkedSkillIndexes: number[] = [];

		if (index > 0) {
			for (let i = index - 1; i >= 0; i--) {
				if (hand[i].sinType === skill.sinType) {
					linkedSkill.push(hand[i]);
					linkedSkillIndexes.push(i);
				} else break;
			}
		}

		if (index < this.skillHand.length - 1) {
			for (let i = index + 1; i < this.skillHand.length; i++) {
				if (hand[i].sinType === skill.sinType) {
					linkedSkill.push(hand[i]);
					linkedSkillIndexes.push(i);
				} else break;
			}
		}

		for (const i of linkedSkillIndexes) {
			hand[i] = undefined as unknown as SkillBlob;
		}

		// 사용한 스킬은 손에서 제거
		this.skillHand = hand.filter((s) => s !== undefined);

		this.emit('useSkill', skill, linkedSkill);
	}

	public addSkillToHand(...skills: SkillBlob[]) {
		this.skillHand.push(...skills);
		this.emit('addSkillToHand', ...skills);
	}
}

export type SkillBlob = {
	name: string;
	sinType: SinType;
	once: boolean;
};

export async function initializeBattle() {
	const controller = new BattlePlayerController([0.7, 0.3]),
		battle = new Battle();

	function close() {
		controller.emit('close');
	}

	return { controller, battle, close };
}
