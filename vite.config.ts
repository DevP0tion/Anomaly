import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	envDir: '../',
	plugins: [sveltekit()],
	server: {
		allowedHosts: ['abnormalities.uk'],
		host: true,
		cors: true,
	},
});
