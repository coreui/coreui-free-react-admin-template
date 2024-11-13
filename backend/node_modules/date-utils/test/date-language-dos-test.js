var vows = require('vows');
var assert = require('assert');

require('../lib/date-utils.min.js').language('fr');

vows.describe('Date language French').addBatch({
    'french dates are correct': {
        topic: function () {
            var instance = new Date('January 1, 2016 16:00:00');

            return instance;
        },
        'DDDD is correctly set': function (topic) {
            assert.equal(topic.toFormat('DDDD'), 'Vendredi');
        },
        'MMMM is correctly set': function (topic) {
            assert.equal(topic.toFormat('MMMM'), 'Janvier')
        }
    },

    'can return correct months in french whit MMM': {
        topic: function () {
            return new Date('January 1, 2016 16:00:00')
        },
        'returns Jan correcty': function (date) { assert.equal(date.addMonths(0).toFormat('MMM'), 'Jan'); },
        'returns Fév correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Fév'); },
        'returns Mar correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Mar'); },
        'returns Avr correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Avr'); },
        'returns Mai correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Mai'); },
        'returns Jui correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Jui'); },
        'returns Aoû correcty': function (date) { assert.equal(date.addMonths(2).toFormat('MMM'), 'Aoû'); },
        'returns Sep correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Sep'); },
        'returns Oct correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Oct'); },
        'returns Nov correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Nov'); },
        'returns Déc correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Déc'); },
    },

    'can return correct months in french whit MMMM': {
        topic: function () {
            return new Date('January 1, 2016 16:00:00')
        },
        'returns Janvier correcty': function (date) { assert.equal(date.addMonths(0).toFormat('MMMM'), 'Janvier'); },
        'returns Février correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Février'); },
        'returns Mars correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Mars'); },
        'returns Avril correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Avril'); },
        'returns Mai correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Mai'); },
        'returns Juin correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Juin'); },
        'returns Juillet correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Juillet'); },
        'returns Août correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Août'); },
        'returns Septembre correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Septembre'); },
        'returns Octobre correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Octobre'); },
        'returns Novembre correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Novembre'); },
        'returns Décembre correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Décembre'); },
    },

    'can return correct days in french whit DDD': {
        topic: function () {
            return new Date('January 3, 2016 16:00:00')
        },
        'returns Dim correcty': function (date) { assert.equal(date.addDays(0).toFormat('DDD'), 'Dim'); },
        'returns Lun correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDD'), 'Lun'); },
        'returns Mar correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDD'), 'Mar'); },
        'returns Mer correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDD'), 'Mer'); },
        'returns Jeu correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDD'), 'Jeu'); },
        'returns Ven correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDD'), 'Ven'); },
        'returns Sam correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDD'), 'Sam'); },
    },

    'can return correct days in french whit DDDD': {
        topic: function () {
            return new Date('January 3, 2016 16:00:00')
        },
        'returns Dimanchi correcty': function (date) { assert.equal(date.addDays(0).toFormat('DDDD'), 'Dimanchi'); },
        'returns Lundi correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDDD'), 'Lundi'); },
        'returns Mardi correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDDD'), 'Mardi'); },
        'returns Mercredi correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDDD'), 'Mercredi'); },
        'returns Jeudi correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDDD'), 'Jeudi'); },
        'returns Vendredi correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDDD'), 'Vendredi'); },
        'returns Samedi correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDDD'), 'Samedi'); },
    }
}).export(module);