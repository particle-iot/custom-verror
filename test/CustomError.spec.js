'use strict';

const chai = require('chai');
const expect = chai.expect;
const CustomVError = require('../lib/CustomVError');

class TestError extends CustomVError {
	constructor(...args) {
		super(...args);
		this.message = this.message || 'Test message';
	}
}

describe('CustomVError', function () {
	describe('constructor', function () {
		it('captures stack trace', function () {
			function createError() {
				return new TestError();
			}

			expect(createError().stack).to.include('at createError');
		});

		it('sets the name', function () {
			expect(new TestError().name).to.eq('TestError');
		});

		it('sets the default message', function () {
			expect(new TestError().message).to.eq('Test message');
		});

		it('sets the custom message', function () {
			expect(new TestError('Custom message').message).to.eq('Custom message');
		});

		// TODO: other ways to call the constructor?
		// Maybe show how to wrap another error?
	});

	describe('set message', function () {
		it('sets the custom message', function () {
			const error = new TestError();
			error.message = 'Custom message';

			expect(error.message).to.eq('Custom message');
		});
	});

	describe('get message', function () {
		// TODO: I don't know what all this code in get message is supposed to do
	});

	it('matches custom error class using instanceof', function () {
		try {
			throw new TestError();
		} catch (error) {
			expect(error instanceof TestError).to.eq(true);
		}
	});

	it('matches Node Error class using instanceof', function () {
		try {
			throw new TestError();
		} catch (error) {
			expect(error instanceof Error).to.eq(true);
		}
	});
});
