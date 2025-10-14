import i18n from 'sveltekit-i18n';
import type { Config } from 'sveltekit-i18n';

const config: Config = {
	loaders: [
		{
			locale: 'en',
			key: 'common',
			loader: async () => await import('./locales/en/common.json'),
		},
		{
			locale: 'ko',
			key: 'common',
			loader: async () => await import('./locales/ko/common.json'),
		},
	],
};

export const { t, locale, locales, loading, loadTranslations } = new i18n(
	config
);
