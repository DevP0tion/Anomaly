<script lang="ts">
	import { onMount } from 'svelte';
	import { io } from 'socket.io-client';
	import type { PageProps } from './$types';
	import { PUBLIC_SOCKETIO_ADDRESS } from '$env/static/public';

	let { data }: PageProps = $props();

	onMount(() => {
		const client = io(PUBLIC_SOCKETIO_ADDRESS, {
			transports: ['websocket'],
			auth: {},
		});

		client
			.on('connect', () => {
				console.log('Connected to Socket.IO server.');
			})
			.on('disconnect', () => {
				console.log('Disconnected from Socket.IO server.');
			});
	});
</script>

<a href="/">home</a> <br />
exploration
