type LogScope = 'APP' | 'SERVER' | 'DB' | 'PAYMENT';
type LogLevel = 'info' | 'warn' | 'error' | 'debug';

type LogMeta = Record<string, unknown>;

const shouldLog = (level: LogLevel) => {
    if (process.env.NODE_ENV !== 'production' && level === 'debug') return false;
    return true;
}

const formatMeta = (metadata: LogMeta | undefined): string => {
    if (!metadata) return "";
    return Object.entries(metadata).map(([key, value]) => `${key}=${value}`).join(' ')
}

const formatLog = (level: LogLevel, scope: LogScope, message: string, metadata?: LogMeta): string => {
    if (!message) return '';

    const timestamp = new Date().toISOString();
    const metaString = formatMeta(metadata);

    return `${timestamp} [${scope}] ${level.toUpperCase()} ${message}${
    metaString ? ` | ${metaString}` : ''
  }`;
}

const info = (scope: LogScope, message: string, metadata?: LogMeta) => {
    if (!shouldLog('info')) return;
    console.log(formatLog('info', scope, message, metadata));
};
const warn = (scope: LogScope, message: string, metadata?: LogMeta) => {
    if (!shouldLog('warn')) return;
    console.warn(formatLog('warn', scope, message, metadata));
};
const error = (scope: LogScope, message: string, metadata?: LogMeta) => {
    if (!shouldLog('error')) return;
    console.error(formatLog('warn', scope, message, metadata));
};
const debug = (scope: LogScope, message: string, metadata?: LogMeta) => {
    if (!shouldLog('debug')) return;
    console.debug(formatLog('debug', scope, message, metadata));
};

export const logger = { info, warn, error, debug };