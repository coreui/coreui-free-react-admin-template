var vows = require('vows');
var assert = require('assert');

require('../lib/date-utils.min.js').language('es');

vows.describe('Date language Spanish').addBatch({
    'spanish dates are correct': {
        topic: function () {
            var instance = new Date('January 1, 2016 16:00:00');

            return instance;
        },
        'DDDD is correctly set': function (topic) {
            assert.equal(topic.toFormat('DDDD'), 'Viernes');
        },
        'MMMM is correctly set': function (topic) {
            assert.equal(topic.toFormat('MMMM'), 'Enero')
        }
    },

    'can return correct months in spanish whit MMM': {
        topic: function (){
            return new Date('January 1, 2016 16:00:00')
        },
        'returns Ene correcty': function (date) { assert.equal(date.addMonths(0).toFormat('MMM'), 'Ene'); },
        'returns Feb correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Feb'); },
        'returns Mar correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Mar'); },
        'returns Abr correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Abr'); },
        'returns May correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'May'); },
        'returns Jun correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Jun'); },
        'returns Jul correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Jul'); },
        'returns Ago correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Ago'); },
        'returns Sep correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Sep'); },
        'returns Oct correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Oct'); },
        'returns Nov correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Nov'); },
        'returns Dic correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMM'), 'Dic'); },
    },

    'can return correct months in spanish whit MMMM': {
        topic: function () {
            return new Date('January 1, 2016 16:00:00')
        },
        'returns Enero correcty': function (date) { assert.equal(date.addMonths(0).toFormat('MMMM'), 'Enero'); },
        'returns Febrero correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Febrero'); },
        'returns Marzo correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Marzo'); },
        'returns Abril correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Abril'); },
        'returns Mayo correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Mayo'); },
        'returns Junio correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Junio'); },
        'returns Julio correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Julio'); },
        'returns Agosto correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Agosto'); },
        'returns Septiembre correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Septiembre'); },
        'returns Octubre correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Octubre'); },
        'returns Noviembre correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Noviembre'); },
        'returns Diciembre correcty': function (date) { assert.equal(date.addMonths(1).toFormat('MMMM'), 'Diciembre'); },
    },

    'can return correct days in spanish whit DDD': {
        topic: function () {
            return new Date('January 3, 2016 16:00:00')
        },
        'returns Dom correcty': function (date) { assert.equal(date.addDays(0).toFormat('DDD'), 'Dom'); },
        'returns Lun correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDD'), 'Lun'); },
        'returns Mar correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDD'), 'Mar'); },
        'returns Mie correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDD'), 'Mie'); },
        'returns Jue correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDD'), 'Jue'); },
        'returns Vie correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDD'), 'Vie'); },
        'returns Sab correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDD'), 'Sab'); },
    },

    'can return correct days in spanish whit DDDD': {
        topic: function () {
            return new Date('January 3, 2016 16:00:00')
        },
        'returns Domingo correcty': function (date) { assert.equal(date.addDays(0).toFormat('DDDD'), 'Domingo'); },
        'returns Lunes correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDDD'), 'Lunes'); },
        'returns Martes correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDDD'), 'Martes'); },
        'returns Miércoles correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDDD'), 'Miércoles'); },
        'returns Jueves correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDDD'), 'Jueves'); },
        'returns Viernes correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDDD'), 'Viernes'); },
        'returns Sábado correcty': function (date) { assert.equal(date.addDays(1).toFormat('DDDD'), 'Sábado'); },
    }
}).export(module);