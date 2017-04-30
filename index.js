/**
 * User: Harold
 * Date: 2017.04.30.
 * @fileOverview index
 */

'use strict';

var escapeTable = {
    0: "\\x00",
    1: "\\x01",
    2: "\\x02",
    3: "\\x03",
    4: "\\x04",
    5: "\\x05",
    6: "\\x06",
    7: "\\a",
    8: "\\b",
    9: "\\t",
    10: "\\n",
    11: "\\v",
    12: "\\f",
    13: "\\r",
    14: "\\x0e",
    15: "\\x0f",
    16: "\\x10",
    17: "\\x11",
    18: "\\x12",
    19: "\\x13",
    20: "\\x14",
    21: "\\x15",
    22: "\\x16",
    23: "\\x17",
    24: "\\x18",
    25: "\\x19",
    26: "\\x1a",
    27: "\\x1b",
    28: "\\x1c",
    29: "\\x1d",
    30: "\\x1e",
    31: "\\x1f",
    0x27: "\\'",
    0x22: "\\\"",
    0x3F: "\\?",
    0x5C: "\\\\",
    0x7f: "\\x7f",
    0xa0: "\\xa0"
};

var StringBuffer = function () {
    this.buffer = [];
    this.index = 0;
};

StringBuffer.prototype = {
    append: function (s) {
        this.buffer[this.index] = s;
        this.index += 1;
        return this;
    },
    toString: function () {
        return this.buffer.join('');
    }
};

/**
 * Escape input argument
 * @param {string} content
 * @param {{encoding: string, escapeNonAscii: boolean}} [options]
 * @return {string}
 *
 * Compatible with grunt-contrib-copy
 */
function escapeCString(content, options) {
    if (typeof content !== 'string') return content;
    options = typeof options === 'object' ? options : {};
    var encoding = typeof options.encoding === 'string' ? options.encoding : 'utf-8';
    var escapeNonAscii = typeof options.escapeNonAscii === 'boolean' ? options.escapeNonAscii : true;
    var bytes = Buffer.from(content, encoding);
    var result = new StringBuffer();
    for (var i = 0; i < bytes.length; i++) {
        /** @type number */
        var b = bytes[i];
        var esc = escapeTable[b];
        if (esc === undefined && escapeNonAscii && b > 127 && b <= 255) {
            esc = "\\x" + b.toString(16);
        } else if (esc === undefined) {
            esc = String.fromCharCode(b);
        }
        result.append(esc);
    }
    return result.toString();
}

module.exports = escapeCString;
