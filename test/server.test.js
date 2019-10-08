'use strict';
const {describe}     = require('mocha');
const chai           = require('chai');
const chaiAsPromised = require('chai-as-promised');
const expect         = chai.expect;
const server         = require('../server');

chai.use(chaiAsPromised);

describe('server', () =>
{
    context('Server running', () =>
    {
        it('should ', () =>
        {
            expect(server).to.exist;
        });
    })
});
