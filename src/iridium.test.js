const { getTable } = require('./iridium');
const fs = require('fs');
const request = require('request');
const utils = require('./utils');

/**
 * @fileoverview This module tests the getTable function from the iridium module.
 * @requires ./iridium
 * @requires fs
 * @requires request
 * @requires ./utils
 * @requires jest
 */

/**
 * Mocking the 'fs' module with jest.fn() for testing.
 * @type {Object}
 */
jest.mock('fs', () => ({
    existsSync: jest.fn(),
    mkdir: jest.fn(),
    appendFile: jest.fn(),
}));

/**
 * Mocking the 'request' module with jest.fn() for testing.
 * @type {Function}
 */
jest.mock('request', () => jest.fn());

/**
 * Mocking the 'utils' module with jest.fn() for testing.
 * @type {Object}
 */
jest.mock('./utils', () => ({
    get_options: jest.fn(),
    post_options: jest.fn(),
    iridium_options: jest.fn(),
    md5: jest.fn(),
}));

describe('getTable function', () => {
    it('should create a directory if it does not exist', () => {
        fs.existsSync.mockReturnValue(false);
        getTable({ root: 'testRoot/', counter: 0 });
        expect(fs.mkdir).toHaveBeenCalledWith('testRoot/IridiumFlares/', expect.any(Function));
    });

    it('should call request with get_options when counter is 0', () => {
        const mockOptions = { option: 'value' };
        utils.get_options.mockReturnValue(mockOptions);
        getTable({ root: 'testRoot/', counter: 0 });
        expect(request).toHaveBeenCalledWith(mockOptions, expect.any(Function));
    });

    it('should call get_options if counter is 0', () => {
        getTable({ root: 'testRoot/', counter: 0 });
        expect(utils.get_options).toHaveBeenCalledWith('IridiumFlares.aspx?');
    });

    it('should call post_options if counter is not 0', () => {
        getTable({ root: 'testRoot/', counter: 1, opt: 'testOpt' });
        expect(utils.post_options).toHaveBeenCalledWith('IridiumFlares.aspx?', 'testOpt');
    });
});