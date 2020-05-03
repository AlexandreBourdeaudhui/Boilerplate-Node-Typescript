/*
 * Init
 */
const { NODE_ENV } = process.env;

/**
 * Environnement is on `production` ?
 * @type {Boolean}
 */
export const isProd: boolean = NODE_ENV === 'production';

/**
 * Environnement is on `development` ?
 * @type {Boolean}
 */
export const isDev: boolean = NODE_ENV === 'development';

/**
 * Environnement is on `test` ?
 * @type {Boolean}
 */
export const isTest: boolean = NODE_ENV === 'test';
