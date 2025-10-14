export type TimeStamp = string;

export type TableScheme<N extends string, T extends { [key: string]: any }> = {
	name: N;
	data: T;
};

export type BaseTableScheme = TableScheme<
	'Base',
	{
		uuid: string;
		name?: string;
		create_time?: TimeStamp;
		banned?: boolean;
		dev?: boolean;
		// starlight?: number;
	}
>;

export type BaseScheme = {
	uuid: string;
	name: string;
	create_time: TimeStamp;
	banned: boolean;
	dev: boolean;
	// starlight: number;
};

export type ResourceTableScheme = TableScheme<
	'Resource',
	{
		uuid: string;
		starlight?: number;
		wra?: number;
		lus?: number;
		slo?: number;
		glu?: number;
		glo?: number;
		pri?: number;
		env?: number;
	}
>;

export type ResourceScheme = {
	uuid: string;
	starlight: number;
	wra: number;
	lus: number;
	slo: number;
	glu: number;
	glo: number;
	pri: number;
	env: number;
};
