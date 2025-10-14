<script lang="ts">
  import { io } from 'socket.io-client';
  // import { PUBLIC_SOCKETIO_ADDRESS } from '$env/static/public';

  let logs: string[] = $state(["Initializing..."]);

  const client = io("wss://socketio.abnormalities.uk", {
    transports: ['websocket'],
  });

  client.on('connect', () => {
    logs.push('Connected to Socket.IO server.');
  }).on('disconnect', () => {
    logs.push('Disconnected from Socket.IO server.');
  });

  // client.emit('message', 'Hello from SvelteKit client!');
</script>

{#each logs as log}
	{log} <br />
{/each}