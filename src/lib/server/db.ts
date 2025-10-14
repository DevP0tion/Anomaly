import {
	MYSQL_HOST,
	MYSQL_ID,
	MYSQL_PASSWORD,
	MYSQL_PORT,
} from '$env/static/private';
import mysql from 'mysql2/promise';

// Database connection

export let db: mysql.Connection;

export async function initializeDB(): Promise<mysql.Connection> {
	if (db === undefined) {
		try {
			db = (await mysql.createConnection({
				host: MYSQL_HOST,
				user: MYSQL_ID,
				password: MYSQL_PASSWORD,
				port: parseInt(MYSQL_PORT),
				database: 'UserData',
			})) as typeof db;
		} catch (e) {
			db = undefined as unknown as typeof db;
			throw e;
		}

		await db.connect();
	}

	return db;
}

import type { TableScheme } from './dbTable';

// Utility to create queries

type ConstructionType = 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE' | 'MERGE';

export function createQuery(construction: 'SELECT'): {
	exists: (variable: string, query: string) => Runner<boolean, string>;
};

export function createQuery<T extends { [key: string]: any }>(
	construction: 'INSERT',
	...data: T[]
): Runner<void, string>;
export function createQuery<T extends TableScheme<string, any>>(
	construction: 'INSERT',
	...data: T['data'][]
): Runner<void, T['name']>;

export function createQuery(construction: 'UPDATE'): string;

export function createQuery(construction: 'DELETE'): string;

export function createQuery<T extends { [key: string]: any }>(
	construction: 'MERGE',
	condition: { [key: string]: any },
	...data: T[]
): Runner<void, string>;
export function createQuery<T extends TableScheme<string, any>>(
	construction: 'MERGE',
	condition: { [key: string]: any },
	...data: T['data'][]
): Runner<void, T['name']>;

export function createQuery(
	construction: ConstructionType,
	...args: any[]
): any {
	switch (construction) {
		case 'SELECT':
			return selectQuery();
		case 'INSERT':
			return insertQuery(...args);
		case 'UPDATE':
			return 'UPDATE query not implemented yet';
		case 'DELETE':
			return 'DELETE query not implemented yet';
		case 'MERGE':
			return mergeQuery(...args);
	}
}

function selectQuery() {
	return {
		exists: (variable: string, query: string) => {
			return {
				run: async (database: typeof db, table: string) => {
					const [rows] = await database.query(
						'SELECT ' + add(existsQuery(variable, query), table).build()
					);
					return (rows as any[]).length > 0;
				},
			};
		},
	};
}

function insertQuery(...args: any[]) {
	const data = args as { [key: string]: any }[];
	const columns = [...new Set(data.flatMap((d) => Object.keys(d)))];
	const calibratedData = data.map((d) => {
		const row = columns.map((col) => {
			const val = d[col];
			if (typeof val === 'string') {
				return `'${val}'`;
			} else if (val === null) {
				return 'default';
			} else {
				return val;
			}
		});
		return row.join(', ');
	});

	let query = [
		`INSERT INTO `,
		0,
		` (${columns.join(', ')}) VALUES (${calibratedData.join(', ')});`,
	];

	return {
		run: async (database: typeof db, table: string) => {
			await database.query(add(query, table).build());
		},
	};
}

function mergeQuery(...[condition, ...args]: any[]) {
	const data = args as { [key: string]: any }[];
	const columns = [...new Set(data.flatMap((d) => Object.keys(d)))];
	const calibratedData = data.map((d) => {
		const row = columns.map((col) => {
			const val = d[col];
			if (typeof val === 'string') {
				return `'${val}'`;
			} else if (val === null) {
				return 'default';
			} else {
				return val;
			}
		});
		return row.join(', ');
	});

	let query = [
		`INSERT INTO `,
		0,
		` (${columns.join(', ')}) VALUES (${calibratedData.join(
			', '
		)}) ON DUPLICATE KEY UPDATE `,
		1,
		`;`,
	];

	return {
		run: async (database: typeof db, table: string) => {
			const conditionKeys = Object.keys(condition);
			const updateClause = columns
				.filter((col) => !conditionKeys.includes(col))
				.map((col) => `${col} = VALUES(${col})`)
				.join(', ');
			await database.query(add(query, table).add(updateClause).build());
		},
	};
}

function existsQuery(variable: string, query: string) {
	return [`EXISTS(SELECT 1 FROM `, 0, ` ${variable} WHERE ${query} )`];
}

// Utility to build queries

function add(query: (string | number)[], part: string) {
	let added = false;

	for (let i = 0; i < query.length; i++) {
		if (query[i] === 0) {
			query[i] = part;
			added = true;
		} else if (typeof query[i] === 'number') {
			query[i] = (query[i] as number) - 1;
		}
	}
	if (!added) query.push(part);

	return {
		add: (part: string) => add(query, part),
		build: () => query.join(''),
	};
}

type Runner<R, T extends string> = {
	run: (database: typeof db, table: T) => Promise<R>;
};
