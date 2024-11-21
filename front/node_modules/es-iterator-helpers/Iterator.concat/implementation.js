'use strict';

var $TypeError = require('es-errors/type');

var AdvanceStringIndex = require('es-abstract/2024/AdvanceStringIndex');
var Call = require('es-abstract/2024/Call');
var CompletionRecord = require('es-abstract/2024/CompletionRecord');
var CreateIteratorFromClosure = require('../aos/CreateIteratorFromClosure');
var GetIteratorDirect = require('../aos/GetIteratorDirect');
var GetMethod = require('es-abstract/2024/GetMethod');
var IsArray = require('es-abstract/2024/IsArray');
var IteratorCloseAll = require('../aos/IteratorCloseAll');
var IteratorStepValue = require('es-abstract/2024/IteratorStepValue');
var ThrowCompletion = require('es-abstract/2024/ThrowCompletion');
var Type = require('es-abstract/2024/Type');

var forEach = require('es-abstract/helpers/forEach');
var getIteratorMethod = require('es-abstract/helpers/getIteratorMethod');

var callBound = require('call-bind/callBound');
var $indexOf = callBound('Array.prototype.indexOf');
var $splice = callBound('Array.prototype.splice');

var iterHelperProto = require('../IteratorHelperPrototype');

var SLOT = require('internal-slot');

module.exports = function concat() {
	if (this instanceof concat) {
		throw new $TypeError('`Iterator.concat` is not a constructor');
	}

	var iterables = []; // step 1

	forEach(arguments, function (item) { // step 2
		if (Type(item) !== 'Object') {
			throw new $TypeError('`Iterator.concat` requires all arguments to be objects'); // step 2.1
		}
		// var method = GetMethod(item, Symbol.iterator); // step 2.2
		var method = getIteratorMethod(
			{
				AdvanceStringIndex: AdvanceStringIndex,
				GetMethod: GetMethod,
				IsArray: IsArray
			},
			item
		);
		if (typeof method === 'undefined') {
			throw new $TypeError('`Iterator.concat` requires all arguments to be iterable'); // step 2.3
		}
		iterables[iterables.length] = { '[[OpenMethod]]': method, '[[Iterable]]': item }; // step 2.4
	});

	var openIters = []; // step 3
	var sentinel = {};
	var closeIfAbrupt = function (abruptCompletion) {
		if (!(abruptCompletion instanceof CompletionRecord)) {
			throw new $TypeError('`abruptCompletion` must be a Completion Record');
		}
		if (openIters.length > 0) {
			IteratorCloseAll(
				openIters,
				abruptCompletion
			);
		}
	};

	var index = 0;
	var closure = function () { // step 4
		if (index < iterables.length) {
		// forEach(iterables, function (iterable) { // step 4.a
			var iteratorRecord;
			if (openIters.length === 0) {
				var iterable = iterables[index];
				var iter = Call(iterable['[[OpenMethod]]'], iterable['[[Iterable]]']); // step 4.a.i
				if (Type(iter) !== 'Object') {
					closeIfAbrupt(ThrowCompletion(new $TypeError('???'))); // step 4.a.ii
				}
				iteratorRecord = GetIteratorDirect(iter); // step 4.a.iii
				iteratorRecord.obj = iterable['[[Iterable]]'];
				openIters[openIters.length] = iteratorRecord; // step 4.a.iv
			} else {
				iteratorRecord = openIters[0];
			}

			// var innerAlive = true; // step 4.a.v
			// while (innerAlive) { // step 4.a.vi
			{ // eslint-disable-line no-lone-blocks
				// step 4.a.vi.3.a
				var innerValue;
				try {
					innerValue = IteratorStepValue(iteratorRecord); // step 5.b.ix.4.a
				} catch (e) {
					// innerAlive = false;
					$splice(openIters, $indexOf(openIters, iteratorRecord), 1); // step 4.a.vi.2.a
					index += 1;
					closeIfAbrupt(ThrowCompletion(e)); // step 4.a.vi.3.b
				}
				if (iteratorRecord['[[Done]]']) {
					// innerAlive = false;
					$splice(openIters, $indexOf(openIters, iteratorRecord), 1);
					index += 1;
					return closure();
				}
				return innerValue; // // step 4.a.vi.3.a
			}
		// });
		}

		// return ReturnCompletion(undefined); // step 4.b
		return sentinel;
	};
	SLOT.set(closure, '[[Sentinel]]', sentinel); // for the userland implementation
	SLOT.set(closure, '[[CloseIfAbrupt]]', closeIfAbrupt); // for the userland implementation

	var gen = CreateIteratorFromClosure(closure, 'Iterator Helper', iterHelperProto, ['[[UnderlyingIterators]]']); // step 5
	SLOT.set(gen, '[[UnderlyingIterators]]', []); // step 6
	return gen; // step 7
};
