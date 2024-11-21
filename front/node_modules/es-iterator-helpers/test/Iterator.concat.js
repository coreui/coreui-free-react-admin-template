'use strict';

var defineProperties = require('define-properties');
var test = require('tape');
var callBind = require('call-bind');
var functionsHaveNames = require('functions-have-names')();
var forEach = require('for-each');
var debug = require('object-inspect');
var v = require('es-value-fixtures');
var hasSymbols = require('has-symbols/shams')();
var mockProperty = require('mock-property');

var index = require('../Iterator.concat');
var impl = require('../Iterator.concat/implementation');
var from = require('../Iterator.from/polyfill')();

var isEnumerable = Object.prototype.propertyIsEnumerable;

var testIterator = require('./helpers/testIterator');

module.exports = {
	tests: function (concat, name, t) {
		t['throws'](
			function () { return new concat(); }, // eslint-disable-line new-cap
			TypeError,
			'`' + name + '` itself is not a constructor'
		);
		t['throws'](
			function () { return new concat({}); }, // eslint-disable-line new-cap
			TypeError,
			'`' + name + '` itself is not a constructor, with an argument'
		);

		forEach(v.primitives.concat(v.objects), function (nonIterator) {
			t['throws'](
				function () { concat(nonIterator); },
				TypeError,
				debug(nonIterator) + ' is not an iterable Object'
			);
		});

		t.test('actual iteration', { skip: !hasSymbols }, function (st) {
			forEach(v.nonFunctions, function (nonFunction) {
				var badIterable = {};
				badIterable[Symbol.iterator] = nonFunction;
				st['throws'](
					function () { concat([], badIterable, []).next(); },
					TypeError,
					debug(badIterable) + ' is not a function'
				);
			});

			forEach(v.strings, function (string) {
				st['throws'](
					function () { concat(string); },
					TypeError,
					'non-objects are not considered iterable'
				);
				var stringIt = concat(['a'], [string], ['c']);
				testIterator(stringIt, ['a', string, 'c'], st, 'string iterator: ' + debug(string));
			});

			var arrayIt = concat([1, 2, 3]);
			st.equal(typeof arrayIt.next, 'function', 'has a `next` function');

			st.test('real iterators', { skip: !hasSymbols }, function (s2t) {
				var iter = [1, 2][Symbol.iterator]();
				testIterator(concat(iter, [3]), [1, 2, 3], s2t, 'array iterator + array yields combined results');

				s2t.end();
			});

			st.test('observability in a replaced String iterator', function (s2t) {
				var originalStringIterator = String.prototype[Symbol.iterator];
				var observedType;
				s2t.teardown(mockProperty(String.prototype, Symbol.iterator, {
					get: function () {
						'use strict'; // eslint-disable-line strict, lines-around-directive

						observedType = typeof this;
						return originalStringIterator;
					}
				}));

				concat(from(''));
				s2t.equal(observedType, 'string', 'string primitive -> primitive receiver in Symbol.iterator getter');
				concat(from(Object('')));
				s2t.equal(observedType, 'object', 'boxed string -> boxed string in Symbol.iterator getter');

				s2t.end();
			});

			st.end();
		});
	},
	index: function () {
		test('Iterator.concat: index', function (t) {
			module.exports.tests(index, 'Iterator.concat', t);

			t.end();
		});
	},
	implementation: function () {
		test('Iterator.concat: implementation', function (t) {
			module.exports.tests(impl, 'Iterator.concat', t);

			t.end();
		});
	},
	shimmed: function () {
		test('Iterator.concat: shimmed', function (t) {
			t.test('Function name', { skip: !functionsHaveNames }, function (st) {
				st.equal(Iterator.concat.name, 'concat', 'Iterator.concat has name "concat"');
				st.end();
			});

			t.test('enumerability', { skip: !defineProperties.supportsDescriptors }, function (et) {
				et.equal(false, isEnumerable.call(Iterator, 'concat'), 'Iterator.concat is not enumerable');
				et.end();
			});

			module.exports.tests(callBind(Iterator.concat, Iterator), 'Iterator.concat', t);

			t.end();
		});
	}
};
