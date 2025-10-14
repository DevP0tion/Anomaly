import { initializeDB } from '$lib/server/db';

{
	// Initialize the database connection when the server starts
	await initializeDB();
	console.log('Database initialized');
}

export async function handle({ event, resolve }) {
	console.log(`${event.request.method} ${event.request.url}`);

	return await resolve(event);
}
