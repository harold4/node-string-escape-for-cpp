/**
 * User: Harold
 * Date: 2017.04.30.
 * @fileOverview test
 */

'use strict';

var expect = require('chai').expect;
var escape = require('../index');

describe('#cppEscaper', function () {
    it('should return same as input (null)', function () {
        var result = escape(null);
        expect(result).to.equal(null);
    });
    it('should return same as input (null)', function () {
        var result = escape(undefined);
        expect(result).to.equal(undefined);
    });
    it('should return same as input (object)', function () {
        var o = {};
        var result = escape(o);
        expect(result).to.equal(o);
    });
    it('should return same as input (int)', function () {
        var result = escape(1);
        expect(result).to.equal(1);
    });
    it('should return same as input (float)', function () {
        var result = escape(3.14);
        expect(result).to.equal(3.14);
    });
    it('should return same as input (boolean)', function () {
        var result = escape(false);
        expect(result).to.equal(false);
    });

    it('should return empty string', function () {
        var result = escape('');
        expect(result).to.equal('');
    });

    it('should return same as input (no escape needed - simple)', function () {
        var s = "foo bar";
        var result = escape(s);
        expect(result).to.equal(s);
    });
    it('should return same as input (no escape needed - symbols)', function () {
        var s = "([{foo !@#$%^&* bar}])";
        var result = escape(s);
        expect(result).to.equal(s);
    });
    it('should return escaped value (diacritics)', function () {
        var s = "Árvíztűrő tükörfúrógép";
        var result = escape(s);
        expect(result).to.equal('\\xc3\\x81rv\\xc3\\xadzt\\xc5\\xb1r\\xc5\\x91 t\\xc3\\xbck\\xc3\\xb6rf\\xc3\\xbar\\xc3\\xb3g\\xc3\\xa9p');
    });
    it('should return escaped value (binary)', function () {
        var s = "\x00\x09\n";
        var result = escape(s);
        expect(result).to.equal('\\x00\\t\\n');
    });

});
