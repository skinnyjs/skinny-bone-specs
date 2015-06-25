"use strict";

"use strict";

const chai = require('chai');
const sinon = require('sinon');
const co = require('co');

chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));
chai.use(require('chai-shallow-deep-equal'));

require('mocha-sinon');

process.env.NODE_ENV = 'testing';

let isBootstrapped = false;

module.exports = function(skinny, app) {
    if (isBootstrapped) {
        return false;
    }

    isBootstrapped = true;

    if (app) {
        bootstrapApp(skinny, app);
    }

    return true;
};

function bootstrapApp(skinny, app) {
    before(co.wrap(function *() {
        let isDebugging = typeof v8debug === 'object';
        this.timeout(isDebugging ? 3000000 : 30000);
        
        yield module.parent.require(app);
    }));

    after(co.wrap(function *() {
        yield skinny.listeners('*shutdown');
    }));
}