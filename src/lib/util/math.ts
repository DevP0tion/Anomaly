export function sampleFromSet<T>(
	set: Set<T>,
	amount: number,
	options?: {
		replace?: boolean;
		allowPartial?: boolean;
		rng?: () => number;
	}
): T[] {
	const result: T[] = [];
	const replace = options?.replace ?? true;
	const allowPartial = options?.allowPartial ?? false;
	const rng = options?.rng ?? Math.random;

	// Set이 비어있거나 amount가 0 이하인 경우
	if (set.size === 0 || amount <= 0) {
		return result;
	}

	// replace가 false이고 요청한 양이 Set 크기보다 큰 경우, Set 크기로 제한
	const actualAmount = replace ? amount : Math.min(amount, set.size);

	// Set을 배열로 변환
	const items = Array.from(set);

	if (replace) {
		// 복원 추출: 원본에서 제거
		if (allowPartial) {
			// allowPartial이 true일 때: 중복 허용 (원본에서 제거하지 않음)
			for (let i = 0; i < actualAmount; i++) {
				const randomIndex = Math.floor(rng() * items.length);
				const selectedItem = items[randomIndex];
				result.push(selectedItem);
			}
			// 선택된 항목들을 원본 Set에서 제거
			result.forEach((item) => set.delete(item));
		} else {
			// allowPartial이 false일 때: 중복 불허용 (하나씩 제거)
			const availableItems = [...items];
			for (let i = 0; i < Math.min(actualAmount, availableItems.length); i++) {
				const randomIndex = Math.floor(rng() * availableItems.length);
				const selectedItem = availableItems.splice(randomIndex, 1)[0];
				result.push(selectedItem);
				set.delete(selectedItem);
			}
		}
	} else {
		// 비복원 추출: 중복 없이 추출 (원본 Set은 변경하지 않음)
		const availableItems = [...items];
		for (let i = 0; i < actualAmount; i++) {
			const randomIndex = Math.floor(rng() * availableItems.length);
			const selectedItem = availableItems.splice(randomIndex, 1)[0];
			result.push(selectedItem);
		}
	}

	return result;
}
