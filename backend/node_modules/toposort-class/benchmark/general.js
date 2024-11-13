var Toposort = require( "../index.js" );
var OldToposort = require( "./0.3.1/toposort.js" );

suite( "simple dependency chains", function() {
    set( "delay", 0 );
    set( "mintime", 1750 );

    bench( "0.3.1 version", function() {
        var t = new OldToposort();

        t.add( "3", "2" )
            .add( "2", "1" )
            .add( "6", "5" )
            .add( "5", ["2", "4"] ).sort();
    } );

    bench( "current version", function() {
        var t = new Toposort();

        t.add( "3", "2" )
            .add( "2", "1" )
            .add( "6", "5" )
            .add( "5", ["2", "4"] ).sort();
    } );
} );

suite( "slightly more complex chains", function() {
    set( "delay", 0 );
    set( "mintime", 1750 );

    bench( "0.3.1 version", function() {
        var t = new OldToposort();

        t.add( "3", "1" )
            .add( "2", "3" )
            .add( "4", ["2", "3"] )
            .add( "5", ["3", "4"] )
            .add( "6", ["3", "4", "5"] )
            .add( "7", "1" )
            .add( "8", ["1", "2", "3", "4", "5"] )
            .add( "9", ["8", "6", "7"] ).sort();
    } );

    bench( "current version", function() {
        var t = new Toposort();

        t.add( "3", "1" )
            .add( "2", "3" )
            .add( "4", ["2", "3"] )
            .add( "5", ["3", "4"] )
            .add( "6", ["3", "4", "5"] )
            .add( "7", "1" )
            .add( "8", ["1", "2", "3", "4", "5"] )
            .add( "9", ["8", "6", "7"] ).sort();
    } );
} );
