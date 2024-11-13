var vows = require('vows');
var assert = require('assert');

require('../lib/date-utils.min.js').language('pt-BR');

vows.describe('Date language Portuguese Brazilian').addBatch({
    'portuguese dates are correct': {
        topic: function () {
            var instance = new Date('January 1, 2016 16:00:00');

            return instance;
        },
        'DDDD is correctly set': function (topic) {
            assert.equal(topic.toFormat('DDDD'), 'Sexta');
        },
        'MMMM is correctly set': function (topic) {
            assert.equal(topic.toFormat('MMMM'), 'Janeiro')
        }
    },

    'can return correct months in portuguese whit MMM': {
        topic: function (){
            return new Date('January 1, 2016 16:00:00')
        },
        'returns Jan correcty': function (date) { assert.equal(date.addMonths(0).toFormat('MMM'), 'Jan'); },
        'returns Fev correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Fev'); },
        'returns Mar correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Mar'); },
        'returns Abr correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Abr'); },
        'returns Mai correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Mai'); },
        'returns Jun correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Jun'); },
        'returns Jul correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Jul'); },
        'returns Ago correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Ago'); },
        'returns Set correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Set'); },
        'returns Out correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Out'); },
        'returns Nov correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Nov'); },
        'returns Dez correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Dez'); },
    },

    'can return correct months in portuguese whit MMMM': {
        topic: function () {
            return new Date('January 1, 2016 16:00:00')
        },
        'returns Janeiro correcty': function (date) { assert.equal(date.addMonths(0).toFormat('MMMM'), 'Janeiro'); },
        'returns Fevereiro correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Fevereiro'); },
        'returns Março correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Março'); },
        'returns Abril correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Abril'); },
        'returns Maio correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Maio'); },
        'returns Junho correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Junho'); },
        'returns Julho correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Julho'); },
        'returns Agosto correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Agosto'); },
        'returns Setembro correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Setembro'); },
        'returns Outubro correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Outubro'); },
        'returns Novembro correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Novembro'); },
        'returns Dezembro correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Dezembro'); },
    },

    'can return correct days in portuguese whit DDD': {
        topic: function () {
            return new Date('January 3, 2016 16:00:00')
        },
        'returns Dom correcty': function (date) { assert.equal(date.addDays(0).toFormat('DDD'), 'Dom'); },
        'returns Seg correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDD'), 'Seg'); },
        'returns Ter correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDD'), 'Ter'); },
        'returns Qua correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDD'), 'Qua'); },
        'returns Qui correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDD'), 'Qui'); },
        'returns Sex correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDD'), 'Sex'); },
        'returns Sab correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDD'), 'Sab'); },
    },

    'can return correct days in portuguese whit DDDD': {
        topic: function () {
            return new Date('January 3, 2016 16:00:00')
        },
        'returns Domingo correcty': function (date) { assert.equal(date.addDays(0).toFormat('DDDD'), 'Domingo'); },
        'returns Segunda correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDDD'), 'Segunda'); },
        'returns Terça correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDDD'), 'Terça'); },
        'returns Quarta correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDDD'), 'Quarta'); },
        'returns Quinta correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDDD'), 'Quinta'); },
        'returns Sexta correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDDD'), 'Sexta'); },
        'returns Sábado correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDDD'), 'Sábado'); },
    }
}).export(module);
