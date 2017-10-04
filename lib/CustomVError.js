'use strict';

const VError = require('verror').VError;

/**
 * Custom error class
 *
 * @param {String} message Message contents
 * @param {Object} extra Metadata about the error. TODO: is this correct?
 * @constructor
 */
class CustomVError extends VError {
	constructor(...args) {
		super(...args);
		Error.captureStackTrace(this, this.constructor);
		this.name = this.constructor.name;
	}

	/**
	 * Shortcut to VError.info()
	 *
	 * @returns {Object} Optional error info
	 */
	get info() {
		return VError.info(this);
	}

	/**
	 * Getter for a legacy attribute
	 *
	 * @returns {String} Message contents
	 */
	get msg() {
		return this.message;
	}

	/**
	 * Setter for the message
	 *
	 * @param {String} message Message contents
	 */
	set message(message) {
		this._message = message;
	}

	/**
	 * Getter appending error info to the message
	 *
	 * @returns {String} Appended message
	 */
	get message() {
		if (!this._message) {
			return;
		}

		if (!Object.keys(this.info).length) {
			return this._message;
		}

		const infoString = Object.keys(this.info).map((key) => {
			return `${key}=${this.info[key]}`;
		}).join(' ');

		return `${this._message} ${infoString}`;
	}
}

module.exports = CustomVError;
