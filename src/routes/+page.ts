import { browser } from '$app/environment';

export async function load() {
	if (!browser) return;
}

const ssr = false;
const csr = true;
