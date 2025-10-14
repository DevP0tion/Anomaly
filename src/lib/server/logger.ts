import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

const { combine, timestamp, label, printf } = winston.format;

const logDir = 'logs';

const logFormat = printf(({ level, message, label, timestamp }) => {
	return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
	format: combine(
		timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
		label({ label: 'Abnormalities' }),
		logFormat
	),
	transports: [
		new winstonDaily({
			level: 'info',
			datePattern: 'YYYY-MM-DD',
			dirname: logDir,
			filename: '%DATE%.log',
			maxFiles: 30,
			zippedArchive: true,
		}),
		new winstonDaily({
			level: 'error',
			datePattern: 'YYYY-MM-DD',
			dirname: logDir + '/error',
			filename: '%DATE%.error.log',
			maxFiles: 30,
			zippedArchive: true,
		}),
	],
});

export { logger };
